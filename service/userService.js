import { User } from './userSchema.js'

const findUserByEmail = async (email) => {
  return await User.findOne({ email })
}

const createUser = async (user) => {
  const { email, password, subscription, role } = user
  const newUser = new User({ email, subscription, role })
  newUser.setPassword(password)
  return await User.create(newUser)
}

const updateUser = async (id, update) => {
  return await User.findByIdAndUpdate(id, update, { new: true })
}

const findUserById = async (id) => {
  return await User.findById(id)
}

const listUsers = async () => {
  return await User.find()
}

const removeUser = async (id) => {
  return await User.findByIdAndDelete(id)
}

export {
  findUserByEmail,
  createUser,
  updateUser,
  findUserById,
  listUsers,
  removeUser
}