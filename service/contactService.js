import { Contact } from './contactSchema.js'

const listContacts = async () => {
  return await Contact.find()
}

const getContactById = async (contactId) => {
  return await Contact.findById(contactId)
}

const addContact = async ({ name, email, phone }) => {
  return await Contact.create({ name, email, phone })
}

const updateContact = async (contactId, update) => {
  return await Contact.findByIdAndUpdate(contactId, update, { new: true })
}

const updateStatusContact = async (contactId, favoriteUpdate) => {
  return await Contact.findByIdAndUpdate(contactId, favoriteUpdate, { new: true })
}

const removeContact = async (contactId) => {
  return await Contact.findByIdAndRemove(contactId);
}

export {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
}