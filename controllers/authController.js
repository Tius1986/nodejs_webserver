const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
    const { username, password } = req.body
    if(!username || !password) {
        return res.status(400).json({ 
            'message': 'Missing credentials, type username and password'
        })
    }
    const user = await User.findOne({ username }).exec()
    if(!user) return res.sendStatus(401)
    if(user.status !== 'Active') {
        return res.status(401).json({ 'message': 'Pending account, check your inbox email'})
    }
    if(user && (await bcrypt.compare(password, user.password))) {
        const roles = Object.values(user.roles).filter(Boolean)
        
        const accessToken = jwt.sign({
            "UserInfo": {
                "username": user.username,
                "roles": roles
            }
        }, 
        process.env.ACCESS_TOKEN, 
        { expiresIn : '15m' })
        
        const refreshToken = jwt.sign({
            "username": user.username
        }, 
        process.env.REFRESH_TOKEN, 
        { expiresIn: '1d' })
        
        user.refreshToken = refreshToken
        const result = await user.save()

        console.log(result)
        console.log(roles)

        res.cookie('jwt', refreshToken, { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'None', 
            maxAge: 24 * 60 * 60 * 1000 
        })

        res.json({ roles, accessToken })

    } else {
        res.status(401).json({ 'error': 'Wrong password' })
    }
}

module.exports = { handleLogin }