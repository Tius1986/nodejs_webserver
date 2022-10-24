const User = require('../models/User')

const handleConfirmation = async (req, res) => {
    const user = await User.findOne({ 
        confirmationCode: req.params.confirmationCode 
    }).exec()
    if(!user) {
        return res.sendStatus(404)
    }
    user.status = 'Active'
    await user.save()
    res.json({ 'message': 'Verification successfully'})
}

module.exports = { handleConfirmation }