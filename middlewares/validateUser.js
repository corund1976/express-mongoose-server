import { userJoiSchema } from '../service/userSchema.js'

const validateUser = (req, res, next) => {
  const { error } = userJoiSchema.validate(req.body)

  if (error) {
    return res
      .status(400)
      .json({
        status: 'Bad request',
        code: 400,
        message: error.details[0].message
      })
  }

  next()
}

export { validateUser }