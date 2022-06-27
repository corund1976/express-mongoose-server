import passport from 'passport'
import Token from '../service/models/tokenSchema.js'
import ApiError from '../exceptions/apiError.js'
import UserDto from '../dtos/userDto.js'

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization']
  const tokenFromHeader =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.replace('Bearer ', '')
      : null
  const UserWithTokensFromDB = await Token.findOne({ accessToken: tokenFromHeader })

  if (!UserWithTokensFromDB) {
    return res
      .status(401)
      .json({
        status: 'error',
        code: 401,
        message: 'Not found user in DB with this token',
      });
  }

  const tokenFromDB = UserWithTokensFromDB.accessToken
  // console.log('tokenFromHeader = ', tokenFromHeader);
  // console.log('tokenFromDB = ', tokenFromDB);

  passport.authenticate('jwt', { session: false }, (err, user) => {
    // console.log('user ===--- ', user);
    if (!user || err || tokenFromHeader !== tokenFromDB) {
      return res
        .status(401)
        .json({
          status: 'error',
          code: 401,
          message: 'Unauthorized - token is out of date',
        });
    }
    // const { password, ...userWithoutPassword } = user
    // req.user = userWithoutPassword
    const userDto = new UserDto(user)
    req.user = { ...userDto }
    // console.log('req.user = ', req.user);
    next();
  })(req, res, next);
}

export { authenticateToken } 