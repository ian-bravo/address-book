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
function Contact(firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function () {
    return this.firstName + " " + this.lastName;
};

Contact.prototype.update = function (firstName, updatedFirstName) {
    if (this.firstName !== updatedFirstName)
        updatedFirstName = firstName;
}

Contact.prototype.update = function ({ updatedFirstName, updatedLastName, updatedNum }) {
    if (updatedFirstName) {
        this.firstName = updatedFirstName;
    }

    if (updatedLastName) {
        this.lastName = updatedLastName;
    }

    if (updatedNum) {
        this.phoneNumber = updatedNum;
    }

};

