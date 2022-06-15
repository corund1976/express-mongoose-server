import { User } from './userSchema.js';

const createUser = async ({ username, email, password }, avatarURL, verificationToken) => {
  const newUser = new User({ username, email, avatarURL, verificationToken })
  newUser.setPassword(password)
  return await newUser.save()
}

export { createUser };