let employeePayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
  employeePayrollList = getEmployeePayrollDataFromStorage();
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
  return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
  const headerHtml =
    "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
    "<th>Salary</th><th>Start Date</th><th>Actions</th>";
  if (employeePayrollList.length == 0) return;
  let innerHtml = `${headerHtml}`;
  for (const employeePayrollData of employeePayrollList) {
    innerHtml = `${innerHtml}
      <tr>
        <td><img class="profile" src="${employeePayrollData._profileImage}" alt=""></td>
        <td>${employeePayrollData._name}</td>
        <td>${employeePayrollData._gender}</td>
        <td>${getDepartmentHtml(employeePayrollData._department)}</td>
        <td>${employeePayrollData._salary}</td>
        <td>${stringifyDate(employeePayrollData._startDate)}</td>
        <td>
          <img id="${employeePayrollData._id}" src="delete-10402.svg" alt="delete" onclick="remove(this)">
          <img id="${employeePayrollData._id}" src="..\assets\icons\create-black-18dp.svg" alt="edit" onclick="update(this)">
        </td>
      </tr>`; 
  }                  
  document.querySelector("#table-display").innerHTML = innerHtml;
};

const getDepartmentHtml = (deptList) => {
 let deptHtml = '';
  for (const dept of deptList) {
   deptHtml = `${deptHtml}<div class='dept-label'>${dept}</div>`
  }
 return deptHtml;
}

const remove = (node) => {
  let empPayrollData = employeePayrollList.find(empData => empData._id == node.id);
  if (!empPayrollData) return;
  const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
  employeePayrollList.splice(index, 1);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();
}