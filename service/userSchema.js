import mongoose from 'mongoose'
import bCrypt from 'bcryptjs'
import Joi from 'joi'

const { Schema, model } = mongoose

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
})

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const User = model('User', userSchema)

const userJoiSchema = Joi.object({
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
    .required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business"),
  token: [
    Joi.string(),
    Joi.number()
  ],
})

export { User, userJoiSchema }