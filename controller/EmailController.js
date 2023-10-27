import nodemailer from 'nodemailer';
import expressAsyncHandler from "express-async-handler"

export const sendMail = expressAsyncHandler(async(data, req, res)=> {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_ID,
          pass: process.env.MAIL_PASSWORD
        }
      });
    
        const info = await transporter.sendMail({
          from: '"Fred Foo 👻" <kumarbhetwal28@gmail.com>', // sender address
          to: data.to, // list of receivers
          subject: data.subject, // Subject line
          text: data.text, // plain text body
          html: data.htm, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
       
    
});