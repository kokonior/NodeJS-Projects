
const SendMail = (toUser, otp) => {
    console.log("send mail running")
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "d4b59f0c323fe1",
            pass: "749b8c78df003e"
        }
    })

    message = {
        from: "YOUR_EMAIL",
        to: toUser,
        subject: "Account Verification",
        text: `your registration OTP is ${otp} `
    }

    transporter.sendMail(message, function (err, info) {
        if (err) {
            console.log("error transporter", err)
        } else {
            console.log('transporter info', info);
        }
    })
}

module.exports = SendMail
