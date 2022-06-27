import jwt from 'jsonwebtoken'

import Token from './models/tokenSchema.js';

const generate = (payload) => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '30m' });

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' });

  return { accessToken, refreshToken }
}

const save = async (userId, accessToken, refreshToken) => {
  const user = await Token.findById(userId)

  if (user) {
    user.accessToken = accessToken
    user.refreshToken = refreshToken

    return await user.save()
  }

  return await Token.create({ userId, accessToken, refreshToken })
}

const remove = async (userId) => {
  return await Token.deleteOne({ userId })
}

const validate = (token, secret) => {
  try {
    const tokenData = jwt.verify(token, secret)
    return tokenData
  } catch (e) {
    return null
  }
}

const search = async (refreshToken) => {
  return await Token.findOne({ refreshToken })
}

export default {
  generate,
  save,
  remove,
  validate,
  search
}