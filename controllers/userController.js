import userService from '../service/userService.js'

const getAll = async (req, res, next) => {
  try {
    const listAllUsers = await userService.listUsers()

    if (listAllUsers) {
      return res
        .status(200)
        .json({
          status: 'ok',
          code: 200,
          data: listAllUsers,
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
          message: `Not found contact id: ${id}`,
        })
    }

    res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        data: { userById },
      })
  } catch (e) {
    next(e)
  }
}

const getCurrent = (req, res, next) => {
  console.log('req.user = ', req.user);
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

    if (updatedUser) {
      const { id: _id, subscription, role } = updatedUser

      return res
        .status(200)
        .json({
          status: 'Ok',
          code: 200,
          data: {
            updatedUser: { id, subscription, role, }
          }
        })
    }
  } catch (e) {
    next(e)
  }
}

const updateCurrentUserSubscription = async (req, res, next) => {
  if (!('subscription' in req.body)) {
    // if (Object.keys(req.body) != 'subscription') {
    return res
      .status(400)
      .json({
        status: 'Bad request',
        code: 400,
        message: 'Missing field *Subscription*',
      })
  }

  try {
    const updatedUser = await userService.update(req.user.id, req.body)

    if (updatedUser) {
      const { id: _id, subscription, role } = updatedUser

      return res
        .status(200)
        .json({
          status: 'Ok',
          code: 200,
          data: {
            updatedUser: { id, subscription, role, }
          }
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
  updateCurrentUserSubscription,
  remove,
}