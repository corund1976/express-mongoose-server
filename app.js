import express from 'express'
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport';
import 'dotenv/config'

import passportConfig from './config/config-passport.js'
import {
  authRouter,
  userRouter,
  contactRouter
} from './routes/index.js'

const app = express()
const __dirname = path.resolve()

const formatsLogger =
  app.get('env') === 'development'
    ? 'dev'
    : 'short'
app.use(morgan(formatsLogger))

app.use(cors())
app.use(express.json())

passportConfig(passport)
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) =>
  res.send('<h1>Hello Express</h1>')
)
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/contacts', contactRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: '🚫 Page not found' })
  next({ status: 404 });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error =
    req.app.get('env') === 'development'
      ? err
      : {};
  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  res
    .status(err.status || 500)
    .json({ message: err.message })
});

export default app