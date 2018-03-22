const express = require('express');
const exphbs  = require('express-handlebars');
const web3 = require('web3');

const app = express();

const port = 5000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/',(req, res) => {
    const fakeMilage = 100000;
    res.render('index', {
        fakeMilage : fakeMilage
    });
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

