const User = require('../models/User')


const getUser = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({ 
        'message': 'User id required' 
    })
    const user = await User.findOne({ _id: req.params.id }).exec()
    if(!user) {
        return res.status(204).json({ 'message': `User id ${req.params.id} not found`})
    }
    res.json(user)
}

const getAllUsers = async (req, res) => {
    const users = await User.find()
    if(!users) return res.status(204).json({ 
        'message': 'No users found' 
    })
    res.json(users)
}

const deleteUser = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({ 
        'message': 'User id required' 
    })
    const user = await User.findOne({ _id: req.body.id }).exec()
    if(!user) {
        return res.status(204).json({ 
            'message': `User id: ${req.body.id} not found`
        })
    }
    const result = await User.deleteOne({ _id: req.body.id })
    res.json(result)
}

module.exports = { 
    getAllUsers, 
    deleteUser,
    getUser 
}