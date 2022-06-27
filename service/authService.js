import { v4 } from 'uuid'

import User from './models/userSchema.js'
import UserDto from '../dtos/userDto.js'
import ApiError from '../exceptions/apiError.js'
import sendVerifyMail from './mailService.js'
import tokenService from './tokenService.js'

const signup = async ({ email, password, subscription, role }) => {
  const candidate = await User.findOne({ email })

  if (candidate) {
    throw ApiError.Conflict(`Email ${email} is already in use`)
  }

  const verificationToken = v4()
  const link = `${process.env.API_URL}/auth/verify/${verificationToken}`
  await sendVerifyMail(email, link)

  const user = new User({ email, subscription, role, verificationToken })
  user.setPassword(password)
  const newUser = await User.create(user)

  const userDto = new UserDto(newUser)
  return userDto
}

const login = async ({ email, password }) => {
  const user = await User.findOne({ email })

  if (!user || !user.validPassword(password)) {
    throw ApiError.Unauthorized(`Email or password is wrong`)
  }

  const userDto = new UserDto(user)

  const payload = { ...userDto };
  const tokens = tokenService.generate(payload)
  await tokenService.save(user._id, tokens.accessToken, tokens.refreshToken)

  return { ...tokens, user: userDto }
}

const logout = async (userId) => {
  return await tokenService.remove(userId)
}

const verify = async ({ verificationToken }) => {
  const user = await User.findOne({ verificationToken })

  if (!user) {
    throw ApiError.NotFound('User not found')
  }

  user.verificationToken = null
  user.verified = true

  return await user.save()
}

const refresh = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw ApiError.Unauthorized('Нет рефреш-токена в куках')
  }

  const userDataFromToken = tokenService.validate(refreshToken, process.env.JWT_REFRESH_SECRET)
  const tokenDataFromDB = tokenService.search(refreshToken)
  // Проверка что и валидация , и поиск в БД прошли успешно
  if (!userDataFromToken || !tokenDataFromDB) {
    throw ApiError.Unauthorized('Неавторизован')
  }
  // Вытащим из БД "свежего" пользователя, т.к. за 60 дней мог "устареть"
  const user = await User.findById(userDataFromToken.id)

  const userDto = new UserDto(user)

  const payload = { ...userDto };
  const tokens = tokenService.generate(payload)
  await tokenService.save(user.id, tokens.accessToken, tokens.refreshToken)

  return { ...tokens, user: userDto }
}

export default {
  signup,
  login,
  logout,
  verify,
  refresh
}