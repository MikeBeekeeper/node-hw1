const readline = require("readline");
const fs = require("fs").promises;
const path = require("path");
const { program } = require("commander");
require("colors");
const nanoid = require("nanoid")

const contactsPath = path.join(__dirname, "db/contacts.json");


async function getContactslist() {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList);
}

async function getContactById(contactId) { 
    const contactList = await getContactslist();
  const contact = contactList.find((item) => item.id === contactId);
  return contact || null;
}

async function addContact(name, email, phone) {
    const contactList = await getContactslist();
    const newContact = {id: nanoid(), name, email, phone}
    contactList.push(newContact)
    fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2))

    return newContact
}

async function deleteContact(contactId) { 
    const contactList = await getContactslist();
  const contactIndex = contactList.findIndex((item) => item.id === contactId);

  if (contactIndex !== -1) {
    contactList.splice(contactIndex, 1);
    fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
    return contactList;
  }
}


// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// })

// rl.on('line', (txt) => {
//     console.log(txt.green)
// })

module.exports = {
  getContactslist,
  getContactById,
  addContact,
  deleteContact
}
