import Joi from 'joi'

import ApiError from '../exceptions/apiError.js'

const userJoiSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  subscription: Joi.string()
    .valid("starter", "pro", "business"),
  role: Joi.string()
    .valid("admin", "user"),
  token: [
    Joi.string(),
    Joi.number()
  ],
})

const validateUser = (req, res, next) => {
  const { error } = userJoiSchema.validate(req.body)

  if (error) {
    throw ApiError.BadRequest(error.details[0].message)
  }

  next()
}

export { validateUser }