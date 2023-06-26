const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function withErrorHandling(asyncFn) {
  try {
    return await asyncFn();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function listContacts() {
  return withErrorHandling(async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  });
}

async function getContactById(contactId) {
  return withErrorHandling(async () => {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  });
}

async function removeContact(contactId) {
  return withErrorHandling(async () => {
    const contacts = await listContacts();
    const index = contacts.findIndex((c) => c.id === contactId);
    if (index === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  });
}

async function addContact({ name, email, phone }) {
  return withErrorHandling(async () => {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
