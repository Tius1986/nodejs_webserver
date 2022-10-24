const User = require('../models/User')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req, res) => {
    
    const cookies = req.cookies
    
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt

    const user = await User.findOne({ refreshToken }).exec()
    
    if (!user) return res.sendStatus(403)
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
        if (err || user.username !== decoded.username) return sendStatus(403)
        
        const roles = Object.values(user.roles)
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": decoded.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: '15m' }
        )
        res.json({ roles, accessToken })
    })
} 

module.exports = { handleRefreshToken }