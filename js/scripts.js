// Business Logic for AddressBook ---------
function AddressBook() {
    this.contacts = {};
    this.currentId = 0;
}

AddressBook.prototype.addContact = function (contact) {
    contact.id = this.assignId();
    this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
};

AddressBook.prototype.findContact = function (id) {
    if (this.contacts[id] !== undefined) {
        return this.contacts[id];
    }
    return false;
};

AddressBook.prototype.deleteContact = function (id) {
    if (this.contacts[id] === undefined) {
        return false;
    }
    delete this.contacts[id];
    return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.emailAddress = emailAddress;
}

Contact.prototype.fullName = function () {
    return this.firstName + " " + this.lastName;
};

// Contact.prototype.update = function ({ updatedFirstName, updatedLastName, updatedNum }) {
//     if (updatedFirstName) {
//         this.firstName = updatedFirstName;
//     }

//     if (updatedLastName) {
//         this.lastName = updatedLastName;
//     }

//     if (updatedNum) {
//         this.phoneNumber = updatedNum;
//     }
// };

// User Interface Logic ---------
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
    let contactsDiv = document.querySelector("div#contacts");
    contactsDiv.innerText = null;
    const ul = document.createElement("ul");
    Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
        const contact = addressBookToDisplay.findContact(key);
        const li = document.createElement("li");
        li.append(contact.fullName());
        li.setAttribute("id", contact.id);
        ul.append(li);
    });
    contactsDiv.append(ul);
}

function displayContactDetails(event) {
    const contact = addressBook.findContact(event.target.id);
    document.querySelector(".first-name").innerText = contact.firstName;
    document.querySelector(".last-name").innerText = contact.lastName;
    document.querySelector(".phone-number").innerText = contact.phoneNumber;
    document.querySelector(".email-address").innerText = contact.emailAddress;
    document.querySelector("div#contact-details").removeAttribute("class");
    document.querySelector("button.delete").setAttribute("id", contact.id);
    document.querySelector("div#contact-details").removeAttribute("class");
}
function handleDelete(event) {
    addressBook.deleteContact(event.target.id);
    document.querySelector("button.delete").removeAttribute("id");
    document.querySelector("div#contact-details").setAttribute("class", "hidden");
    listContacts(addressBook);
}
function handleFormSubmission(event) {
    event.preventDefault();
    const inputtedFirstName = document.querySelector("input#new-first-name").value;
    const inputtedLastName = document.querySelector("input#new-last-name").value;
    const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
    const inputtedEmailAddress = document.querySelector("input#new-email-address").value;
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress);
    addressBook.addContact(newContact);
    listContacts(addressBook);
    document.querySelector("input#new-first-name").value = null;
    document.querySelector("input#new-last-name").value = null;
    document.querySelector("input#new-phone-number").value = null;
    document.querySelector("input#new-email-address").value = null;
}

window.addEventListener("load", function () {
    document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
    document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
    document.querySelector("button.delete").addEventListener("click", handleDelete);
});