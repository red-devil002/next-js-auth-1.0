import nodemailer from "nodemailer";
import User from "@/models/user.model";
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}: any) => {
    try {

        // TODO: congif mail for usage
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        // console.log("Mail", userId)
        // console.log("Email Type", emailType)
        // console.log(typeof emailType)

        if (emailType === "VERIFY") {
            const updatedUser = await User.findByIdAndUpdate(userId, {
              $set: {
                verifyToken: hashedToken, verifyTokenExpiry: new Date(Date.now() + 3600000)
              }
            });

            console.log(updatedUser);
            
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
              $set: {
                forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
              }
            });
        }

        const varifyem = `<p>Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser.
      <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`

      const resetem = `<p>Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'RESET' ? "reset your password" : "verify your email"}
      or copy and paste the link below in your browser.
      <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`

      
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
          });

          const mailOptions = {
            from: 'swetang@no-reply.co', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your passowrd", // Subject line
            // text: "Hello world?", // plain text body
            html: `<p>Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
          }

          const mailResponse =  await transporter.sendMail(mailOptions)
          return mailResponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}