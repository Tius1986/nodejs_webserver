const mongoose = require('mongoose')

const emplyeeSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String,
    }
})

module.exports = mongoose.model('Employee', emplyeeSchema)