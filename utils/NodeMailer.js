const env = require("dotenv");
const nodemailer = require("nodemailer");
env.config();

const transporter = nodemailer.createTransport({
    port: process.env.MAIL_PORT,
    host: process.env.HOST,
    secure: true,
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.APP_PASSWORD,
    },
    secure: true,
  })

exports.sendMail = async(mailData) => {
    transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info)
    })
}