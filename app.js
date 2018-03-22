const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

const port = 5000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/',(req, res) => {
    res.render('index');
});

app.get('/testing',(req, res) => {
    res.render('testing');
});

app.get('/details/:detailId',(req, res) => {
    res.render('details');
});

app.listen(port,() => {
    console.log(`Server Started on ${port}`);
    
});

