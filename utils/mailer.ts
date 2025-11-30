import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/smtp-transport';

export const sendMail = async (email: string, emailType: "email" | "password" | "delete", token?: string) => {
    const transport = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER_LOGIN,
            pass: process.env.MAIL_USER_PASSWORD
        }
    });

    let mailOptions: MailOptions = {
        from: "College companion <mythicalyash21@gmail.com>",
        to: email,
    }
    if(emailType == "email" || emailType == "password"){
        mailOptions["subject"] = emailType == "email" ? "Verify your email" : "Change your password";
        mailOptions["html"] = emailType == "email" ? `<div><p>Verify your email</p><br/>${process.env.NEXTAUTH_URL}/verify-email?token=${token}</div>` : `<div><p>Reset your password</p><br/>${process.env.NEXTAUTH_URL}/reset-password?token=${token}</div>`
    } else if(emailType == "delete") {
        mailOptions["subject"] = "Satyam from College Companion";
        mailOptions["text"] = "Teacher has denied access to you. Your account has been deleted";
    }

    try {
        await transport.sendMail(mailOptions)
    } catch (error) {
        console.log("Error while sending email: ", error);
    }
}
