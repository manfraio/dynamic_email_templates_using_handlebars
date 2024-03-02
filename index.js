require('dotenv').config()

const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

// Configure transporter with GMAIL credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
})

// Configure Handlebars plugin in Nodemailer
const hbsOptions = {
    viewEngine: {
        partialsDir: 'views',
        layoutsDir: 'views',
        defaultLayout: 'baseMessage'
    },
    viewPath: 'views'
}

transporter.use('compile', hbs(hbsOptions))

function sendEmail(to, subject, template, context) {
    //Configure email options like from, to, subject, message, attachments, template...
    const mailOptions = {
        from: 'email@domain.com',
        to,
        subject,
        template,
        context
    }

    // Send email options using the transporter
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log('Error: ', err)
        } else {
            console.log('Message sent successfully!')
        }
    })
}

// Calling the function
sendEmail('email@domain.com', 'Dynamic Email Template with Handlebars', 'anotherMessage', { accessCode: '123456' })
//sendEmail('email@domain.com', 'Dynamic Email Template with Handlebars', 'welcomeMessage', { userName: 'John Doe' })