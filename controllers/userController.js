import userService from '../service/userService.js'
import UserDto from '../dtos/userDto.js'

const getAll = async (req, res, next) => {
  try {
    const listAllUsers = await userService.listUsers()

    if (listAllUsers) {
      return res
        .status(200)
        .json({
          status: 'ok',
          code: 200,
          data: listAllUsers
        })
    }
  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params

  try {
    const userById = await userService.getById(id)

    if (!userById) {
      return res
        .status(404)
        .json({
          status: 'Not found',
          code: 404,
          message: `Not found contact id: ${id}`
        })
    }

    res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        data: { userById }
      })
  } catch (e) {
    next(e)
  }
}

const getCurrent = (req, res, next) => {
  try {
    const currentUser = req.user

    return res
      .status(200)
      .json({
        code: 200,
        status: 'ok',
        data: { currentUser }
      })
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  if (Object.keys(req.body) == 0) {
    return res
      .status(400)
      .json({
        status: 'Bad request',
        code: 400,
        message: 'Missing fields',
      })
  }

  try {
    const updatedUser = await userService.update(req.params.id, req.body)

    if (!updatedUser) {
      return res
        .status(404)
        .json({
          status: 'Not found',
          code: 404,
          message: `Not found contact id: ${id}`,
        })
    }

    return res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        data: { updatedUser }
      })
  } catch (e) {
    next(e)
  }
}

const updateSubscription = async (req, res, next) => {
  if (!('subscription' in req.body) // (Object.keys(req.body) != 'subscription')
    || Object.keys(req.body).length > 1) {
    return res
      .status(400)
      .json({
        status: 'Bad request',
        code: 400,
        message: 'Missing field *Subscription* / Another fields not allowed',
      })
  }

  try {
    const user = await userService.update(req.user.id, req.body)

    if (user) {
      const updatedUser = new UserDto(user)

      return res
        .status(200)
        .json({
          status: 'Ok',
          code: 200,
          data: { updatedUser }
        })
    }
  } catch (e) {
    next(e)
  }
}

const updateAvatar = async (req, res, next) => {
  const { id } = req.user
  const { filename } = req.file
  // req.file = {
  //   fieldname: 'avatar',
  //   originalname: '???????? ???????????? 1_1.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: 'C:\\Projects\\express-mongoose-server\\tmp',
  //   filename: '62bdb022846f8ca667342caa-???????? ???????????? 1_1.jpg',
  //   path: 'C:\\Projects\\express-mongoose-server\\tmp\\???????? ???????????? 1_1.jpg',
  //   size: 171399
  // }
  const avatarURL = `${process.env.API_URL}/avatars/${filename}` // ???????? ?? ?????????? ?? ?????????? ???? ?????????????? !

  try {
    const userData = await userService.update(id, { avatarURL })

    if (userData) {
      const user = new UserDto(userData)

      return res
        .status(200)
        .json({
          status: 'Ok',
          code: 200,
          data: { user }
        })
    }
  } catch (e) {
    next(e)
  }
}

const remove = async (req, res, next) => {
  const id = req.params.id ? req.params.id : req.user.id

  try {
    const result = await userService.remove(id)

    if (!result) {
      return res
        .status(404)
        .json({
          status: 'Not found',
          code: 404,
          message: `Not found user id: ${id}`
        })
    }

    res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        message: `User id: ${id} deleted`
      })
  } catch (e) {
    next(e)
  }
}

export default {
  getAll,
  getById,
  getCurrent,
  update,
  updateSubscription,
  updateAvatar,
  remove,
}