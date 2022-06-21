import passport from 'passport';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization']
  const tokenFromHeader =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.replace('Bearer ', '')
      : null

  passport.authenticate('jwt', { session: false }, (err, user) => {
    const tokenFromDB = user?.token

    if (!user || err || tokenFromHeader !== tokenFromDB) {
      return res
        .status(401)
        .json({
          status: 'error',
          code: 401,
          message: 'Unauthorized',
        });
    }
    // const { password, ...userWithoutPassword } = user
    // req.user = userWithoutPassword
    req.user = user
    next();
  })(req, res, next);
}

export { authenticateToken } 