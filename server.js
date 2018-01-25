var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',() =>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) =>{
    return text.toUpperCase();
});
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log',log + '\n',(err) =>{
        if(err){
            console.log(err);
        }
    });
    next();
});
// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res) => {
    res.render('home.hbs',{
        pageTitle:'ApporioTaxi',
        welcomeMsg:'Welcome To ApporioInfolabs'
    });
});
app.get('/projects',(req,res) => {
   res.render('projects.hbs',{
    pageTitle:'Projects',
   });
});
app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        pageTitle:'About ApporioTaxi',
    });
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage:'400 Bad Request'
    });
});
app.listen(port,() => {
    console.log(`server running at ${port}`);
});