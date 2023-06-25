const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function testContacts() {
  try {
    const contacts = await listContacts();
    console.log("All Contacts:", contacts);

    const contact = await getContactById("C9sjBfCo4UJCWjzBnOtxl");
    console.log("Contact with ID:", contact);

    const removedContact = await removeContact("rsKkOQUi80UsgVPCcLZZW");
    console.log("Removed Contact:", removedContact);

    const newContact = await addContact({
      name: "John Cena",
      email: "johncena@gmail.com",
      phone: "+123456789",
    });
    console.log("New Contact:", newContact);
  } catch (error) {
    console.error("Error:", error);
  }
}

testContacts();
