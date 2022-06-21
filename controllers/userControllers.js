import jwt from 'jsonwebtoken'

import {
  findUserByEmail,
  createUser,
  findUserByIdAndUpdate,
  // findUserById,
} from '../service/userService.js'

const signup = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await findUserByEmail(email)

    if (user) {
      return res
        .status(409)
        .json({
          status: 'Conflict',
          code: 409,
          message: `Email ${email} is already in use`
        })
    }

    const newUser = await createUser(req.body)

    if (newUser) {
      res
        .status(201)
        .json({
          status: 'Created',
          code: 201,
          data: {
            newUser: {
              email: newUser.email,
              subscription: newUser.subscription,
            }
          }
        })
    }
    // res.send('<h1>route = /auth/signup</h1>')
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await findUserByEmail(email)

    if (!user || !user.validPassword(password)) {
      return res
        .status(401)
        .json({
          status: 'Unauthorized',
          code: 401,
          message: 'Email or password is wrong'
        })
    }

    const payload = { id: user._id, email: user.email };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '30m' });

    const userWithToken = await findUserByIdAndUpdate(user._id, { token })

    return res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        data: {
          token: userWithToken.token,
          user: {
            email: userWithToken.email,
            subscription: userWithToken.subscription,
          }
        }
      })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    await findUserByIdAndUpdate(req.user.id, { token: null })
    return res
      .status(204)
      .json({
        status: 'no content',
        code: 204,
      })
  } catch (e) {
    next(e)
  }
}

const current = async (req, res, next) => {
  try {
    const { email, subscription } = req.user

    return res
      .status(200)
      .json({
        code: 200,
        status: 'ok',
        data: {
          user: {
            email,
            subscription,
          }
        }
      })
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  const { subscription } = req.params
  const { id } = req.user
  try {
    const updateUser = await findUserByIdAndUpdate(id, { subscription })

    if (updateUser) {
      return res
        .status
    }
  } catch (e) {
    next(e)
  }
}

export {
  signup,
  login,
  logout,
  current,
  update,
}