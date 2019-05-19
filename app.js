const express= require("express")
const app= express();
const nodemailer= require('nodemailer');

const bodyParser=require('body-parser');

const port =3000;
require('dotenv').config()


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set("view engine", "ejs");








// Routes

app.get('/',(req, res)=>{
    res.render('home');
})

app.get('/about',(req, res, next)=>{
    res.render('about')
})

app.get('/books',(req, res, next)=>{
    res.render('books')
})

app.get('/events',(req, res, next)=>{
    res.render('events')
})

app.get('/contact',(req, res, next)=>{
    res.render('contact')
})

app.get('/success',(req, res)=>{
    res.render('success')
})

app.post('/contact',urlencodedParser,(req,res)=>{
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
      from: 'Node Mailer', // sender address
      to: "jenkins92886@gmail.com", // list of receivers
      subject: "New email for M.P. VanderLoon", // Subject line
      html: output
      // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);
 

res.redirect('/success')

})





app.listen(port, () => {
    console.log("We're connected!")
});