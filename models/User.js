const mongoose = require('mongoose')
const { format } = require('date-fns')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email is required']
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number,

    },
    refreshToken: {
        type: String
    },
    confirmationCode: {
        type: String
    },
    status: {
        type: String,
        enum: ['Active', 'Pending'],
        default: 'Pending'
    },
    createdAt: {
        type: String,
        default: format(new Date(), 'dd.MM.yyyy-HH:mm:ss')
    }
})

module.exports = mongoose.model('User', userSchema)