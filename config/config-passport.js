import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import User from '../service/models/userSchema.js';

const passportConfig = (passport) => {
  const params = {
    secretOrKey: process.env.JWT_ACCESS_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new JWTStrategy(params, function (payload, done) {
      // console.log('payload === ', payload);
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