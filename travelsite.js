// After installing Express by npm,
// we load/import the Express module in main application file
const express = require('express');  
// import module created and located in lib folder
const fortune = require('./lib/fortune.js');

// create the app object, our Express application, by calling top-level 
// express() function
const app = express();

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
    // view engine will specify content type default text/html
    // res.render method renders a view, defaults to a response code of 200
    // and sends the rendered HTML string to the client 
    res.render('home');
});

app.get(('/about'),(req,res) => {
    res.render('about',{ cookie: fortune.getFortune() } );
});

 // custom 404 page
 // 404 catch-all handler(mounting the speciefied callback 
 // middleware function)(app.use adds that). Catchs all other path cases not
 // specified above in other routes
app.use((req,res,next) => {
    // render sets status/200, we need to set path to 404 or response will have 200 status
    res.status(404).render('404');
});

 // custom 500 page
 // 500 error handler(middleware)
 app.use((err,req,res, next) => {
    console.error(err.stack);
    res.status(500).render('500');
});

// disabling Express's default X-Powered-By header(which is sent via response object's headers)
// x-powered-by is one of application settings that can be disable/enable
app.disable('x-powered-by');

// app.set(name, value) method in express
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () =>{
    console.log('Express started on http:localhost:' +
    app.get('port') + ' ; press Ctrl + C to terminate,');

});

