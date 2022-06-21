import { User } from './userSchema.js'

const findUserByEmail = async (email) => {
  return await User.findOne({ email })
}

const createUser = async ({ username, email, password }) => {
  const newUser = new User({ username, email })
  newUser.setPassword(password)
  return await User.create(newUser)
}

const findUserByIdAndUpdate = async (id, update) => {
  return await User.findByIdAndUpdate(id, update, { new: true })
}

const findUserById = async (id) => {
  return await User.findById(id)
}

export {
  findUserByEmail,
  createUser,
  findUserByIdAndUpdate,
  findUserById,
}