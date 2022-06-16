import Contact from './contactSchema.js'

const listContacts = () => {
  return Contact.find()
}

const getContactById = (contactId) => {
  return Contact.findById(contactId)
}

const addContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone })
}

const updateContact = (contactId, update) => {
  return Contact.findByIdAndUpdate(contactId, update, { new: true })
}

const updateStatusContact = (contactId, favoriteUpdate) => {
  return Contact.findByIdAndUpdate(contactId, favoriteUpdate, { new: true })
}

const removeContact = (contactId) => {
  return Contact.findByIdAndRemove(contactId);
}

export {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact
}