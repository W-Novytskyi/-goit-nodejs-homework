// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// } = require("./contacts");
const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.log(list);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);

// invokeAction({ action: "listContacts" });
// invokeAction({ action: "getContactById", id: "rsKkOQUi80UsgVPCcLZZW" });
// invokeAction({
//   action: "addContact",
//   name: "John Cena",
//   email: "johncena@gmail.com",
//   phone: "+123456789",
// });
// invokeAction({ action: "removeContact", id: "oETMLYXTfhvMn0NisEp5E" });

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// invokeAction(argv);

// console.log(argv);

// async function testContacts() {
//   try {
//     const contacts = await listContacts();
//     console.log("All Contacts:", contacts);

//     const contact = await getContactById("C9sjBfCo4UJCWjzBnOtxl");
//     console.log("Contact with ID:", contact);

//     const removedContact = await removeContact("rsKkOQUi80UsgVPCcLZZW");
//     console.log("Removed Contact:", removedContact);

//     const newContact = await addContact({
//       name: "John Cena",
//       email: "johncena@gmail.com",
//       phone: "+123456789",
//     });
//     console.log("New Contact:", newContact);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// testContacts();
