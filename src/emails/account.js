const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:"azadpurbey2@gmail.com",
        subject:`Hello ${name}! welcome to the club I am testing mailing app`,
        text:"I am going to build a task manager app which is used to store things like pictures"

    })  
}
const cancellationEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:"azadpurbey2@gmail.com",
        subject:`Hello ${name}! Goodbye Email`,
        text:"sorry for inconvinience ,Anything we cando to make board tell me"
    })
}

  module.exports={
      sendWelcomeEmail,
      cancellationEmail
  }