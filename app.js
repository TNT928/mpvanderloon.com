const express= require("express")
const app= express();
const port =3000;
app.use(express.static(__dirname + "/public"));

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









app.listen(port, () => {
    console.log("We're connected!")
})