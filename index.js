const { Command } = require("commander");
const contacts = require("./src/contacts.js");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);

    case "get":
      // ... id
      const contact = await contacts.getContactById(id);
      return console.log(contact);

    case "add":
      // ... name email phone
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      // ... id
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
