var Web3 = require('web3');
var fs = require('fs');
var web3client;
var defaultTicketAbi;
var defaultTicketCode;
var defaultBarterAbi;
var defaultBarterCode;
var addressOwner = "0x1df07bd1832aede9325798ffc7e8d6438033ca52";
var privateKey = "734f8e70fd8a99b7d1d6fad134fb8aa72b6f93bf10e5ce462bcd38c95c15d014"
var logger = require('./logger');
var path = "./backend/storage/contracts.txt";
function setup() {
    if (typeof web3client !== 'undefined') {
        web3client = new Web3(web3client.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3client = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    //
    //clear storage

    fs.unlinkSync(path);
    fs.closeSync(fs.openSync(path, 'w'));
    //unlock account 

    //web3client.eth.personal.unlockAccount(addressOwner, privateKey);

    let source = fs.readFileSync("./contracts/contracts.json");
    let contracts = JSON.parse(source)["contracts"];

    defaultTicketAbi = JSON.parse(contracts.TicketContract.abi);
    defaultTicketCode = contracts.TicketContract.bin;

    //  defaultBarterAbi = JSON.parse(contracts.BarterContract.abi);
    //  defaultBarterCode = contracts.BarterContract.bin;


}

function deployTicketContract(name, description, limit, time) {

    var myContract = new web3client.eth.Contract(defaultTicketAbi, {
        from: addressOwner, // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });
    myContract.options.data = defaultTicketCode;

    return myContract.deploy({
        arguments: [name, description, limit, time]
    }).send({
        from: addressOwner,
        gas: 1500000,
        gasPrice: '300000'
    });
}
function deployBarterContract() {

    var myContract = new web3client.eth.Contract(defaultBarterAbi, {
        from: addressOwner, // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });
    myContract.options.data = defaultBarterCode;

    return myContract.deploy({
        arguments: []
    }).send({
        from: addressOwner,
        gas: 1500000,
        gasPrice: '30000000000000'
    });
}
function buyTicket(contractAddress, buyerAddress, ticketsCount) {
    var ticketContract = new web3client.eth.Contract(defaultTicketAbi, contractAddress);
    return new Promise((resolve, reject) => {
        ticketContract.methods.transferTicket(buyerAddress, ticketsCount).call({ from: buyerAddress }).then(function (result) {
            logger.debug(result);
            resolve(result);
        });
    })

}
function getTickets(contractAddress) {
    var ticketContract = new web3client.eth.Contract(defaultTicketAbi, contractAddress);
    return new Promise((resolve, reject) => {
        ticketContract.methods.ticketMap().call({ from: buyerAddress }).then(function (result) {
            logger.debug(result);
            resolve(result);
        });
    })

}

exports.setup = setup;
exports.deployTicketContract = deployTicketContract;
exports.deployBarterContract = deployBarterContract;
exports.buyTicket = buyTicket;
exports.getTickets = getTickets;