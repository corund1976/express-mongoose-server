import { json } from 'express'
import {
  findUser,
  createUser,
} from '../service/userService.js'

const signup = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await findUser(email)

    if (user) {
      return res
        .status(409)
        .json({
          status: 'Conflict',
          code: 409,
          message: `Email ${email} in use`
        })
    }

    const result = await createUser(req.body)

    if (result) {
      res
        .status(201)
        .json({
          status: 'Created',
          code: 201,
          data: {
            user: {
              email: result.email,
              subscription: result.subscription
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
    const user = await findUser(email)
    const pass = await user?.validPassword(password)

    console.log('user =', user)
    console.log("pass =", pass);

    if (!user || !pass) {
      return res
        .status(401)
        .json({
          status: 'Unauthorized',
          code: 401,
          message: 'Email or password is wrong'
        })
    }

    console.log('ok - user exist - login success');

  } catch (e) {
    next(e)
  }
}

const current = async (req, res, next) => {
  res.send('<h1>route = /auth/login</h1>')
}

const logout = async (req, res, next) => {
  res.send('<h1>route = /auth/login</h1>')
}

export {
  signup,
  login,
  current,
  logout,
}