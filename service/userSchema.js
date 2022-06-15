import db from './dbConnection.js';

const { Schema, model } = db;

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 2,
    default: 'Guest',
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/
      return re.test(String(value).toLocaleLowerCase())
    },
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  avatarURL: String,
})

const User = model('user', userSchema);

export default User;