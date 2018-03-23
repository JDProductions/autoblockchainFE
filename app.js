const express = require('express');
const exphbs  = require('express-handlebars');
const Web3 = require('web3');
const bodyParser = require('body-parser');
const driver = require('bigchaindb-driver')


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
    console.log(req.body.searchText);
});


app.get('/testing',(req, res) => {
    res.render('testing');
});

app.get('/details/:detailId',(req, res) => {
    res.render('details');
});

app.listen(port,() => {
    console.log(`Server Started on ${port}`);
    var web3 = new Web3();
    web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
    var address = "0xc67c0fb4fdd8b8846d86370b0ec0b34871592b40"
    abi = JSON.parse('[ { "constant": true, "inputs": [ { "name": "candidate", "type": "bytes32" } ], "name": "totalVotesFor", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "candidate", "type": "bytes32" } ], "name": "validCandidate", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "bytes32" } ], "name": "votesReceived", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "candidateList", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "candidate", "type": "bytes32" } ], "name": "voteForCandidate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "candidateNames", "type": "bytes32[]" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ]')
    var VotingContract = new web3.eth.Contract(abi,address);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
// var contractInstance = VotingContract.at(address);
candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"};
candidateName = "something"

function voteForCandidate() {
VotingContract.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
}
});


var vehicleData = function(vin) {
    var service1 = {Vin: "12345", serviceid: "1", Car: "Honda Civic",  Type: "Oil Change", date: "02/23/2018"};
    var service2 = {Vin: "12345", serviceid: "2", Car: "Honda Civic",  Type: "Brakes", date: "07/10/2017"};
    console.log([service1, service2])
    return [service1, service2]
}
