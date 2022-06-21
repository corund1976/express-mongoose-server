import passport from 'passport';

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {

    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const bearer = authHeader && authHeader.startsWith('Bearer ') ? authHeader : null
    const token = bearer ? bearer.replace('Bearer ', '') : null

    console.log(token);
    console.log(user.token);

    if (!user || err || token !== user.token) {
      return res
        .status(401)
        .json({
          status: 'error',
          code: 401,
          message: 'Unauthorized',
        });
    }

    req.user = user;
    next();
  })(req, res, next);
}

export default auth