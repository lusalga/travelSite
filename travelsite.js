// After installing Express by npm,
// we load/import the Express module in main application file
const express = require('express');  

// create the app object, our Express application, by calling top-level 
// express() function
const app = express();

// define an array of fortune cookies message to be displayed on the About page
const fortunes = [
    "Love is all that matters in the end.",
    "Be a hero today!",
    "A fresh start will put you on your way.",
    "A friend asks only for your time not your money",
    "The fortune you seek is in another cookie.",
    "You will live long enough to open many fortune cookies.",
    "You can always find happiness at work on Friday.",
    "Fortune not found? Abort, Retry, Ignore.",
]

// set up express-handlebars view engine (template framework)
// load the express-handlebars modules, create a default layout called main
const handlebars = require('express-handlebars')
                .create({defaultLayout: 'main'});
                
// register express-handlebars as the view template engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// static middleware(express.static) designates one or more directions containing static resources
app.use(express.static(__dirname + '/public'));

// add home route or root path, for two cases, '/' and 'home' routes
// use app.render to render view (home.handlebar) and send 
// rendered HTML strings to the client
app.get(['/','/home'],(req,res) => {
    // view engine will specify content type and status code
    // default text/html and 200
    res.render('home');
});

app.get(('/about'),(req,res) => {
    const randomNumber = Math.floor(Math.random()*fortunes.length);
    const randomFortune = fortunes[randomNumber];
    res.render('about',{cookie: randomFortune});
});

 // custom 404 page
 // 404 catch-all handler(mounting the speciefied callback 
 // middleware function)(app.use adds that). Catchs all other path cases not
 // specified above in other routes
app.use((req,res,next) => {
    res.status(404).render('404');
});

 // custom 500 page
 // 500 error handler(middleware)

 app.use((err,req,res, next) => {
    console.error(err.stack);
    res.status(500).render('500');
});

// app.set(name, value) method in express
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () =>{
    console.log('Express started on http:localhost:' +
    app.get('port') + ' ; press Ctrl + C to terminate,');

});

