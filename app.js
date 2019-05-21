const express= require("express")
const app= express();
const bodyParser=require('body-parser');
const port =3000;
require('dotenv').config()

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// require route
const contact= require('./routes/contact')

// mount rules

app.use('/contact', contact)


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


app.listen(port, () => {
    console.log("We're connected!")
});