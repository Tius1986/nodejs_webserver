const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (err) {
        console.error(err)
    }
}

module.exports = dbConnection