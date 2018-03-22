const express = require('express');
const exphbs  = require('express-handlebars');
const web3 = require('web3');
const bodyParser = require('body-parser');

const app = express();

const port = 5000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',(req, res) => {
    const fakeMilage = 100000;
    
    res.render('index', {
        fakeMilage : fakeMilage,
    });
    console.log(req.body);
});

app.post('/',(req, res) => {
    res.render('index', {
        vehicleData: vehicleData("1235454")
    });
    console.log(req.body);
});


app.get('/testing',(req, res) => {
    res.render('testing');
});

app.get('/details/:detailId',(req, res) => {
    res.render('details');
});

app.listen(port,() => {
    console.log(`Server Started on ${port}`);
    // postBigChain();    
});

var vehicleData = function(vin) {
    var service1 = {Vin: "12345", serviceid: "1", Car: "Honda Civic",  Type: "Oil Change", date: "02/23/2018"};
    var service2 = {Vin: "12345", serviceid: "2", Car: "Honda Civic",  Type: "Brakes", date: "07/10/2017"};
    console.log([service1, service2])
    return [service1, service2]
}
