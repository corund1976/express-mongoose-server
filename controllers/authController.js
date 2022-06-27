import ApiError from '../exceptions/apiError.js'
import authService from '../service/authService.js'

const signup = async (req, res, next) => {
  try {
    const newUser = await authService.signup(req.body)

    if (newUser) {
      return res
        .status(201)
        .json({
          status: 'Created',
          code: 201,
          data: { newUser }
        })
    }
    // res.send('<h1>route = /auth/signup</h1>')
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body)

    if (user) {
      res.cookie(
        'refreshToken',
        user.refreshToken,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res
        .status(200)
        .json({
          status: 'Ok',
          code: 200,
          data: user
        })
    }
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.id)
    res.clearCookie('refreshToken')

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

const verify = async (req, res, next) => {
  try {
    const user = await authService.verify(req.params)

    if (user) {
      return res
        .status(200)
        .json({
          status: 'Ok',
          code: 200,
          message: 'Verification successful'
        })
      // return res.redirect(process.env.CLIENT_URL)
    }
  } catch (e) {
    next(e)
  }
}

const refresh = async (req, res, next) => {
  try {
    const user = await authService.refresh(req.cookies)

    if (user) {
      res.cookie(
        'refreshToken',
        user.refreshToken,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res
        .status(200)
        .json({
          status: 'Ok',
          code: 200,
          data: user
        })
    }
  } catch (e) {
    next(e)
  }
}

export default {
  signup,
  login,
  logout,
  verify,
  refresh
}