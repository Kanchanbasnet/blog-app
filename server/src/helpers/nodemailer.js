import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs'
import mjml2html from 'mjml';
import path from 'path'

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host:"smtp.ethereal.email",
    port:465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_AUTH_EMAIL,
        pass: process.env.NODEMAILER_AUTH_PASSWORD
    }
})

export const compileEmailtemplate = async(filename, data) =>{
    const mjMail = await fs.promises.readFile(path.join('src/email-templates', filename), 'utf-8');
    const template = mjml2html(mjMail).html;
    return handlebars.compile(template)(data).toString();
}

 export const sendEmail = async(email, htmlContent)=>{
    try{
        transporter.sendMail({
            from: process.env.NODEMAILER_AUTH_EMAIL,
            to: email,
            subject: "Email Verification OTP",
            html: htmlContent
        }, (err, info)=>{
            if(err){
                console.error("Error sending email", err)
            }
            else{
                console.log("Email sent:", info.response);
            }
        })
    }
    catch(error){
        console.error("An error has been occured:", error)
    }
}

