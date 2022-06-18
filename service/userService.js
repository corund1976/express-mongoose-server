import { User } from './userSchema.js';

const findUser = async (email) => {
  return await User.findOne({ email })
}

const createUser = ({ username, email, password }) => {
  const newUser = new User({ username, email })
  newUser.setPassword(password)
  return User.create(newUser)
}

export {
  findUser,
  createUser,
};