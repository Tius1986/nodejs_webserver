const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
})

const sendConfirmationEmail = (username, email, confirmationCode) => {
    transport.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Confirmation account',
        html: 
            `<div style="padding: .75em; background-color: #333; color: #fafafa;">
                <div style="text-align: center;">
                    <h1>Hello ${username}</h1>
                    <p>
                        Thank you for the subscribtion.
                        Please confirm your email by clicking the link below
                    </p>
                    <a style="color: #fafafa;" href="http://localhost:3000/confirmation/${confirmationCode}">Confirm</a>
                </div>
            </div>`
    })
}

module.exports = sendConfirmationEmail