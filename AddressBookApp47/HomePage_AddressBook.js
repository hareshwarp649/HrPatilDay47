let addressbookList;

window.addEventListener('DOMContentLoaded', (event) => {
  if (site_properties.use_local_storage.match("true")) {
    getAddressbookDataFromStorage();
  } else getAddressbookDataFromServer();
});

const processPersonCountDataResponse = () => {
  document.querySelector('.person-count').textContent = addressbookList.length;
  createInnerHtml();
  localStorage.removeItem('editContact');
}

const getAddressbookDataFromStorage = () => {
  addressbookList = localStorage.getItem('AddressBookList') ? JSON.parse(localStorage.getItem('AddressBookList')) : [];
  processPersonCountDataResponse();
}

const getAddressbookDataFromServer = () => {
  makeServiceCall("GET", site_properties.server_url, true)
    .then(responseText => {
      addressbookList = JSON.parse(responseText);
      processPersonCountDataResponse();
    })
    .catch(error => {
      console.log("GET Error Status: " + JSON.stringify(error));
      addressbookList = [];
      processPersonCountDataResponse();
    });
}

createInnerHtml = () => {
  if (addressbookList.length == 0) return;
  const headerHtml = "<th>FullName</th><th class='address-block'>Address</th><th>City" +
    "</th><th>State</th><th>Zip</th><th>Phone</th><th>Actions</th>";

  let innerHtml = `${headerHtml}`;
  for (const addressbookData of addressbookList) {
    innerHtml = `${innerHtml}
    <tr  class="table-data">
        <td>${addressbookData._name}</td>
        <td class="address-block">${addressbookData._address}</td>
        <td>${addressbookData._city}</td>
        <td>${addressbookData._state}</td>
        <td>${addressbookData._zipcode}</td>
        <td>${addressbookData._phone}</td>
        <td>
        <img class="buttons" id="${addressbookData.id}" onclick='remove(this)' alt="delete" src="../assets/icons/delete-black-18dp.svg">
        <img class="buttons" id="${addressbookData.id}" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
        </td>
    </tr>
      `;
  }
  document.querySelector('#table-display').innerHTML = innerHtml;
}

remove = (node) => {
  let addressbookData = addressbookList.find(person => person.id == node.id);
  if (!addressbookData) return;
  const index = addressbookList
    .map(personName => personName.id)
    .indexOf(addressbookData.id);
  addressbookList.splice(index, 1);
  if (site_properties.use_local_storage.match("true")) {
    localStorage.setItem("AddressBookList", JSON.stringify(addressbookList));
    document.querySelector(".person-count").textContent = addressbookList.length;
    createInnerHtml();
  }else {
    const deleteURL = site_properties.server_url + addressbookData.id.toString();
    makeServiceCall("DELETE",deleteURL,false)
    .then(responseText => {
      createInnerHtml();
    })
    .catch(error => {
      console.log("DELETE Error Status: "+ JSON.stringify(error));
    });
  }
}

const update = (node) => {
  const addressbookData = addressbookList.find(person => person.id == node.id);
  if (!addressbookData) return;
  localStorage.setItem('editContact', JSON.stringify(addressbookData))
  window.location.replace(site_properties.add_person_page);
}