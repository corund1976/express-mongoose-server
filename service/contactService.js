import Contact from './contactSchema.js'

const listContacts = async () => {
  return await Contact.find()
}

const getContactById = async (contactId) => {
  return await Contact.findById(contactId)
  // return await Contact.findById({ _id: contactId });
}

const addContact = async (newContact) => {
  const { name, email, phone } = newContact
  const contact = new Contact({
    name: name,
    email: email,
    phone: phone,
  });
  return await contact.save();
}

const updateContact = () => {

}

const updateStatusContact = () => {

}

const removeContact = async (contactId) => {
  return await Contact.findByIdAndRemove(contactId);
  // return await Contact.findByIdAndRemove({ _id: contactId });
}

export {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact
}