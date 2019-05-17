const express= require("express")
const app= express();
const nodemailer= require('nodemailer');
const xoauth2= require('xoauth2');
const bodyParser=require('body-parser');
const port =3000;


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


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

app.post('/contact',(req,res)=>{
    const output = `
    <p>You have a new contact</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email:${req.body.email}</li>
    <li>Message:${req.body.message}</li>
    </ul>
    
    `
async function main(){

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: process.env.ID,
        clientSecret: process.env.SECRET
        
    },
   
});

let info = await transporter.sendMail({
    from: '"Michael" <jenkins92886@gmail.com>', // sender address
    to: "jenkins92886@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>",
    auth:{
        user: 'jenkins92886@gmail.com',
        refreshToken: process.env.REFRESH,
        accessToken: process.env.ACCESS,
        expires: 3600

    } 
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);


})









app.listen(port, () => {
    console.log("We're connected!")
});