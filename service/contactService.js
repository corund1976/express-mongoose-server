import Contact from './models/contactSchema.js'

const listContacts = async (query, userId) => {
  const { page = 1, limit = 5, favorite } = query
  const queryCriteria = favorite ? { owner: userId, favorite } : { owner: userId }
  const result = await Contact.paginate(
    queryCriteria,
    { page, limit }
  )
  return result.docs
}

const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, owner: userId })
}

const addContact = async (newContact, userId) => {
  const { name, email, phone } = newContact
  return await Contact.create(
    { name, email, phone, owner: userId }
  )
}

const updateContact = async (contactId, userId, update) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    update,
    { new: true }
  )
}

const updateStatusContact = async (contactId, userId, favoriteUpdate) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    favoriteUpdate,
    { new: true }
  )
}

const removeContact = async (contactId, userId) => {
  return await Contact.findOneAndRemove(
    { _id: contactId, owner: userId }
  )
}

export {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
}