// After installing Express by npm, we need to tell the application
// we require express.
const express = require('express');  

// Creating the app object, our express application, by calling top-level 
// express() function.
const app = express();

// set up handlebars view engine (template framework)
const handlebars = require('handlebars')
                .create({defaultLayout : 'main'});
// register handlebars as the view template engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// app.set(name, value) method in express
app.set('port', process.env.PORT || 3000);

app.get(('/'),(req,res) => {
    res.type('text/plain');
    res.status(200).send('2020 Travel Agency');
});

app.get(('/about'),(req,res) => {
    res.type('text/plain');
    res.status(200).send('About 2020 Travel Agency');
});

 // custom 404 page
app.use((req,res,next) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

 // custom 500 page
 app.use((err,req,res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Not Found');
});

app.listen(app.get('port'), () =>{
    console.log('Express started on http:localhost:' +
    app.get('port') + ' ; press Ctrl + C to terminate,');

});

