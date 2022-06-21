import { contactJoiSchema } from '../service/contactSchema.js'

const validateContact = (req, res, next) => {
  const { error } = contactJoiSchema.validate(req.body)

  if (error) {
    return res
      .status(400)
      .json({
        status: 'Bad request',
        code: 400,
        message: error.details[0].message,
      })
  }

  next()
}

export { validateContact }