const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
// const mobileRoute = require('./routes/mobile')
// connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log('connected to db!')
)
// middleware
app.use(express.json())

// import routes

// Route MiddleWares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(3000, () => {
  console.log('Server Up and running')
})
