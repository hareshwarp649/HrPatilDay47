let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener("DOMContentLoaded", (event) => {
  const name = document.querySelector("#name");
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      setTextValue('.text-error', "");
      return;
    }
    try {
      new EmployeePayrollData().name = name.value;
      setTextValue('.text-error', "");
    } catch (e) {
      setTextValue('.text-error', e);
    }
  });

  const date = document.querySelector('#date');
  date.addEventListener('input', function() {
    let startDate = getInputValueById("#day") + "-" + getInputValueById("#month") + "-" + getInputValueById("#year");
    try {
      new EmployeePayrollData().startDate = new Date(Date.parse(startDate));
      setTextValue('.date-error', "");
    }catch (e) {
      setTextValue('.date-error', e);
    }
  })

  const salary = document.querySelector("#salary");
  const output = document.querySelector(".salary-output");
  output.textContent = salary.value;
  salary.addEventListener("input", function () {
    output.textContent = salary.value;
  });

  checkForUpdate();
});

const save = (event) => {
 event.preventDefault();
 event.stopPropogation(); 
 try {
   setEmployeePayrollObject();
   createAndUpdateStorage();
   resetForm();
   window.location.replace(site_properties.home_page);
 }
 catch (e) {
   return;
 }
}  

const setEmployeePayrollObject = () => {
 employeePayrollObj._name = getInputValueById('#name');
 employeePayrollObj._profileImage = getSelectedValues("[name=profile]").pop();
 employeePayrollObj._gender = getSelectedValues("[name=gender]").pop();
 employeePayrollObj._department = getSelectedValues("[name=department]");
 employeePayrollObj._salary = getInputValueById('#salary');
 employeePayrollObj._notes = getInputValueById('#notes');
 let date = getInputValueById("#day") + "-" + getInputValueById("#month") + "-" + getInputValueById("#year");
 employeePayrollObj._startDate = date;
}

const createEmployeePayroll = () => {
 let employeePayrollData = new EmployeePayrollData();
 try {
   employeePayrollData.name = getInputValueById('#name');
 }
 catch (e) {
   setTextValue('.text-error', e);
   throw e;
 }

 employeePayrollData.profileImage = getSelectedValues("[name=profile]").pop();
 employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
 employeePayrollData.department = getSelectedValues("[name=department]");
 employeePayrollData.salary = getInputValueById("#salary");
 employeePayrollData.notes = getInputValueById("#notes");

 let date =  getInputValueById("#year") + "-" + getInputValueById("#month") + "-" + getInputValueById("#day");
 employeePayrollData.date = Date.parse(date);
 alert(employeePayrollData.toString());
 return employeePayrollData;
}

const getInputValueById = (id) => {
 let value = document.querySelector(id).value;
 return value;
} 

const getSelectedValues = (propertyValue) => {
 let allItems = document.querySelectorAll(propertyValue);
 let selItems = [];
 allItems.forEach((item) => {
   if (item.checked) selItems.push(item.value);
 });
 return selItems;
};

function createAndUpdateStorage(employeePayrollData) {
 let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
 if (employeePayrollList) {
  let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
  if (!empPayrollData) {
   employeePayrollList.push(createEmployeePayrollData());
  } else {
   const index  =employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
   employeePayrollList.splice(index, 1, createEmployeePayrollData(empPayrollData._id));
  }
 }else {
  employeePayrollList = [createEmployeePayrollData()];
 }
 localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayrollData = (id) => {
 let empPayrollData = new EmployeePayrollData();
 if(!id) empPayrollData.id = createNewEmployeeID();
 else empPayrollData.id = id;
 setEmployeePayrollData(empPayrollData);
 return empPayrollData;
}

const setEmployeePayrollData = (empPayrollData) => {
 try {
  empPayrollData.name = employeePayrollObj._name;
 } catch (e) {
  setTextValue('.text-error', e);
  throw e;
 }
 empPayrollData.profileImage = employeePayrollObj._profileImage;
 empPayrollData.gender = employeePayrollObj._gender;
 empPayrollData.department = employeePayrollObj._department;
 empPayrollData.salary = employeePayrollObj._salary;
 empPayrollData.notes = employeePayrollObj._notes;
 try {
  empPayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
 } catch(e) {
  setTextValue('.date-error', e);
  throw e;
 }
}

const createNewEmployeeID = () => {
 let empID = localStorage.getItem("EmployeeID");
 empID = !empID ? 1 : (parseInt(empID)+1).toString();
 localStorage.setItem("EmployeeID", empID);
 return empID;
}

const resetForm = () => {
 setValue('#name', '');
 unsetSelectedValues('[name=profile]');
 unsetSelectedValues('[name=gender]');
 unsetSelectedValues('[name=department]');
 setValue('#salary', '');
 setTextValue('.salary-output', 400000);
 setValue('#day', '1');
 setValue('#month', 'January');
 setValue('#year', '2021');
 setValue('#notes', '');
}

const unsetSelectedValues = (propertyValue) => {
 let allItems = document.querySelectorAll(propertyValue);
 allItems.forEach(item => {
     item.checked = false;
 });
}

const setTextValue = (id, value) => {
 const element = document.querySelector(id);
 element.textContent = value;
}

const setValue = (id, value) => {
 const element = document.querySelector(id);
 element.value = value;
}

const checkForUpdate = () => {
  const employeePayrollJSON = localStorage.getItem('editEmp');
  isUpdate = employeePayrollJSON ? true : false;
  if (!isUpdate) return;
  employeePayrollObj = JSON.parse(employeePayrollJSON);
  setForm();
}

const setForm = () => {
  setValue('#name', employeePayrollObj._name);
  setSelectedValues('[name=profile]', employeePayrollObj._profileImage);
  setSelectedValues('[name=gender]', employeePayrollObj._gender);
  setSelectedValues('[name=department]', employeePayrollObj._department);
  setValue('#salary', employeePayrollObj._salary);
  setTextValue('.salary-output', employeePayrollObj._salary);
  setValue('#notes', emyeePayrollObj._notes);
  let date = stringifyDate(employeePayrollObj._startDate).split(" ");
  setSelectedIndex('#day', date[0]);
  setSelectedIndex('#day', date[1]);
  setSelectedIndex('#day', date[2]);
}

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    if (Array.isArray(value)) {
      if (value.includes(item.value)) {
        item.checked = true;
      }
    }
    else if (item.value == value)
      item.checked = true;
  });
}

const setSelectedIndex = (id, index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
}