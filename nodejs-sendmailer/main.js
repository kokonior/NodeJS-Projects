const nodemailer = require('nodemailer');
const fs = require('fs');

const main = async () => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youraccount@gmail.com',
            pass: 'yourpassword'
        }
    });

    let sendMessage = await transporter.sendMail({
        from: "Test from my account",
        to: "yourfriend@email.com",
        subject: "Testing Send Emailer with Nodemailer Package",
        html: "<h1>Hello World!</h1>",
        attachments: {
            filename: 'my-attachment.jpg',
            content: fs.createReadStream('./my-picture.jpeg')
        }
    });

    console.log('-----------');
    console.log(`Message sent: ${sendMessage.messageId}`);
    console.log('-----------');
}

main().catch(err => {
    console.log(err);
})