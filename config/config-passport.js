import {
  Strategy as JWTStrategy,
  ExtractJwt,
} from 'passport-jwt';

import { User } from '../service/userSchema.js';

const passportConfig = (passport) => {
  const params = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new JWTStrategy(params, function (payload, done) {
      User.find({ _id: payload.id })
        .then(([user]) => {
          if (!user) {
            return done(new Error('User not found'));
          }
          return done(null, user);
        })
        .catch(err => done(err));
    }),
  )
}

export default passportConfig