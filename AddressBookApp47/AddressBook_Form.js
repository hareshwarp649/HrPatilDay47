
let isUpdate = false;
let addressbookObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  const nameError = document.querySelector('.name-error');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      nameError.textContent = "";
      return;
    }
    try {
      checkName(name.value);
      nameError.textContent = "";
    } catch (e) {
      nameError.textContent = e;
    }
  });

  const address = document.querySelector('#address');
  const addressError = document.querySelector('.address-error');
  address.addEventListener('input', function () {
    if (address.value.length == 0) {
      addressError.textContent = "";
      return;
    }
    try {
      checkAddress(address.value);
      addressError.textContent = "";
    } catch (e) {
      addressError.textContent = e;
    }
  });

  const zip = document.querySelector('#zip');
  const zipError = document.querySelector('.zip-error');
  zip.addEventListener('input', function () {
    if (zip.value.length == 0) {
      zipError.textContent = "";
      return;
    }
    try {
      checkZip(zip.value);
      zipError.textContent = "";
    } catch (e) {
      zipError.textContent = e;
    }
  });

  const phone = document.querySelector('#phone');
  const phoneError = document.querySelector('.phone-error');
  phone.addEventListener('input', function () {
    if (phone.value.length == 0) {
      phoneError.textContent = "";
      return;
    }
    try {
      checkPhoneNo(phone.value);
      phoneError.textContent = "";
    } catch (e) {
      phoneError.textContent = e;
    }
  });

  checkForUpdate();

});

const save = (event) => {
  try {
    setAddressBookObj();
    if (site_properties.use_local_storage.match("true")) {
      createAndUpdateStorage();
      window.location.replace(site_properties.home_page);
    } else createOrUpdateAddressbookIntoJSONServer();
  } catch (e) {
    return;
  }
}

const setAddressBookObj = () => {
  if (!isUpdate && site_properties.use_local_storage.match("true")) {
    addressbookObj.id = createNewContactId();
  }
  addressbookObj._name = document.querySelector('#name').value;
  addressbookObj._address = document.querySelector('#address').value;
  addressbookObj._city = document.querySelector('#city').value;
  addressbookObj._state = document.querySelector('#state').value;
  addressbookObj._zipcode = document.querySelector('#zip').value;
  addressbookObj._phone = document.querySelector('#phone').value;
}

const createOrUpdateAddressbookIntoJSONServer = () => {
  let postURL = site_properties.server_url;
  let methodCall = "POST";
  if (isUpdate) {
    methodCall = "PUT";
    postURL = postURL + addressbookObj.id.toString();
  }
  makeServiceCall(methodCall, postURL, true, addressbookObj)
    .then(responseText => {
      window.location.replace(site_properties.home_page);
    })
    .catch(error => {
      throw error;
    });
}

const createAndUpdateStorage = () => {
  let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));

  if (addressBookList) {
    let addressbookData = addressBookList.find(person => person.id == addressbookObj.id);
    if (!addressbookData) {
      addressBookList.push(addressbookObj);
    } else {
      const index = addressBookList.map(person => person.id).indexOf(addressbookData.id);
      addressBookList.splice(index, 1, addressbookObj);
    }

  } else {
    addressBookList = [addressbookObj];
  }
  alert(addressBookList.toString());
  localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

const createNewContactId = () => {
  let contactId = localStorage.getItem("ContactID");
  contactId = !contactId ? 1 : (parseInt(contactId) + 1).toString();
  localStorage.setItem("ContactID", contactId);
  return contactId;
}

const resetForm = () => {
  document.querySelector('#name').value = '';
  document.querySelector('.name-error').textContent = '';
  document.querySelector('#address').value = '';
  document.querySelector('.address-error').textContent = '';
  document.querySelector('#city').value = '';
  document.querySelector('#state').value = '';
  document.querySelector('#zip').value = '';
  document.querySelector('.zip-error').textContent = '';
  document.querySelector('#phone').value = '';
  document.querySelector('.phone-error').textContent = '';
}

const checkForUpdate = () => {
  const addressbookJson = localStorage.getItem('editContact');
  isUpdate = addressbookJson ? true : false;
  if (!isUpdate) return;
  addressbookObj = JSON.parse(addressbookJson);
  setForm();
}

const setForm = () => {
  document.querySelector('#name').value = addressbookObj._name;
  document.querySelector('#address').value = addressbookObj._address;
  document.querySelector('#city').value = addressbookObj._city;
  document.querySelector('#state').value = addressbookObj._state;
  document.querySelector('#zip').value = addressbookObj._zipcode;
  document.querySelector('#phone').value = addressbookObj._phone;
}