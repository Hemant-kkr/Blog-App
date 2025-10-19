import nodeMailer from 'nodemailer';
 async function sendEmail(to,subject,text,html){   

if(!to || !subject || !text) return false;
    try{
        const transporter= nodeMailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL_USERID,
                pass:process.env.EMAIL_PASSWORD
            }
        })

            await transporter.verify();
        const mailOptions={
            from:process.env.EMAIL_USERID,
            to:to,
            subject:subject,
            text:text,
            html:html        };  

        const info = await transporter.sendMail(mailOptions);
        return info;
    }
    catch(error){
        console.error('Error sending email:', error);
        return false;   
    }

  }
    export default sendEmail;   