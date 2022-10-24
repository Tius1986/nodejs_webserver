require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dbConnection = require('./config/dbConnection')
const { logger } = require('./middleware/logEvents')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')

const port = process.env.PORT || 3000

dbConnection()

app.use(logger)

app.use(credentials)

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

// Routes
app.use('/register', require('./routes/register'))
app.use('/confirmation', require('./routes/confirmation'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

// Protected Routes
app.use(verifyJWT)
app.use('/api/employees', require('./routes/api/employees'))
app.use('/api/users', require('./routes/api/users'))

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Successfully connected to mongodb')
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
})