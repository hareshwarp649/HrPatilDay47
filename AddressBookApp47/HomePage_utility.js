
const checkName = (name) => {
    let nameRegex = RegExp('^([A-Z]{1}[a-z]{2,}[ ]{0,1})+$');
    if (!nameRegex.test(name)) throw "Name is Incorrect"; 
}

const checkAddress = (address) => {
    let addressRegex = RegExp('^([A-Za-z0-9/.,-]{3,}.)+$');
    if (!addressRegex.test(address)) throw "Address is Incorrect";
}

const checkZip = (zipcode) => {
    let zipRegex = RegExp('^[1-9]{1}[0-9]{5}$');
    if (!zipRegex.test(zipcode)) throw "zip is Incorrect";
}

const checkPhoneNo = (phone) => {
    let phoneRegex = RegExp('^([+]{1})?([91]{2})?([1-9]{1}[0-9]{9})$');
    if (!phoneRegex.test(phone)) throw "Phone is Incorrect";
}