const express = require('express');
const exphbs  = require('express-handlebars');
const driver = require('bigchaindb-driver')
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
        fakeMilage : fakeMilage
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

var postBigChain = function() {
    const alice = new driver.Ed25519Keypair()
    const Vin = {
                    'Vin': '123456789',
                    'date': '02/23/2018',
                    'Car Model': 'Civic',
                    'Maintenance': 'Oil Change',
                    'Location': 'Local Honda Dealer'
                }
    const conn = new driver.Connection(
        'https://test.bigchaindb.com/api/v1/',
        { app_id: '155b5f9c',
          app_key: '1e1c78faab0d30a7efff50fde7a5ad0b' })
    const tx = driver.Transaction.makeCreateTransaction(
        {Vin},
        null,
        [ driver.Transaction.makeOutput(
            driver.Transaction.makeEd25519Condition(alice.publicKey))],
        alice.publicKey)
    const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)
    conn.postTransaction(txSigned)
    .then(() => conn.pollStatusAndFetchTransaction(txSigned.id))
    .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))
    console.log("Success");
}

