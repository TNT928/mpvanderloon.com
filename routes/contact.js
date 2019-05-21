const express= require("express");
const router= express.Router();
const bodyParser=require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const nodemailer= require('nodemailer');


router.post('/',(req,res)=>{
  const output= `

  <p>You have a new contact request</p>

  <h3>Contact Details</h3>

  <ul>
       <li> Name: ${req.body.Name}</li>
       <li> Email: ${req.body.Email}</li>
      <li> Message: ${req.body.Message}</li>
  
  </ul>
  
  `;

  async function main(){

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user:'jenkins92886@gmail.com',
          pass: process.env.PASSWORD
          
      },
     
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from:"Node Mailer" ,
    to: "jenkins92886@gmail.com", 
    subject: "New email for M.P. VanderLoon", 
    html: output
   
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

main().catch(console.error);

res.redirect('/success');


});



module.exports=router;