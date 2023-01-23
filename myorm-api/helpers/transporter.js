const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'muhammaddefryan@gmail.com', // Email Sender
        pass: 'uiuanptjavfsusfz' // Key Generate
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter