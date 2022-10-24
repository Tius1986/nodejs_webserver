const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendConfirmationEmail = require('../config/mail')

const handleRegistration = async (req, res) => {
    const { username, email, password } = req.body
    if(!username || !email || !password) {
        return res.status(400).json({ 
            'message': 'Username email and password are required' 
        })
    }
    const dupliacateUsername = await User.findOne({ username }).exec()
    const duplicateEmail = await User.findOne({ email }).exec()
    
    if(dupliacateUsername) return res.status(409).json({ 
        'message': 'Username already registered' 
    })
    if(duplicateEmail) return res.status(409).json({
        'message': 'Email already registered'
    })
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const token = jwt.sign(email, process.env.ACCESS_TOKEN)

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            confirmationCode: token
        })

        sendConfirmationEmail(
            newUser.username,
            newUser.email,
            newUser.confirmationCode
        )

        console.log(newUser)

        res.status(201).json({ 
            'message': 'Registration confirmed, please check your email for the activate your account' 
        })

    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { handleRegistration }