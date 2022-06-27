import Joi from 'joi'

import ApiError from '../exceptions/apiError.js'

const contactJoiSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }),
  phone: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  favorite: Joi.boolean(),
})

const validateContact = (req, res, next) => {
  const { error } = contactJoiSchema.validate(req.body)

  if (error) {
    throw ApiError.BadRequest(error.details[0].message)
  }

  next()
}

export { validateContact }