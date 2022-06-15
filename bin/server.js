import mongoose from 'mongoose'

import app from '../app.js'

mongoose.Promise = global.Promise

const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('👌 Connection to MongoDB succesful ...')
    app.listen(PORT, () =>
      console.log('🐇 Server is running... Use API on port:', PORT)
    )
  })
  .catch(error => {
    console.log('🛑 Connection to MongoDB unsuccesful: ', error.message);
    process.exit(1)
  })