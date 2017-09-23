var Web3 = require('web3');
var fs = require('fs');
var web3client;
var defaultTicketAbi;
var defaultTicketCode;
var defaultBarterAbi;
var defaultBarterCode;
var addressOwner = "0xdeb06aaa4592075fab80919c37a09d7011c8298b";
var privateKey = "0d9ea1ed82e3b576119cbcffc1d8e7db57be699711d6a00a49211d28853baef9"

function setup() {
    if (typeof web3client !== 'undefined') {
        web3client = new Web3(web3client.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3client = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    //unlock account 

    web3.personal.unlockAccount(addressOwner, privateKey);

    let source = fs.readFileSync("./contracts/contracts.json");
    let contracts = JSON.parse(source)["contracts"];

    defaultTicketAbi = JSON.parse(contracts.TicketContract.abi);
    defaultTicketCode = contracts.TicketContract.bin;

    //  defaultBarterAbi = JSON.parse(contracts.BarterContract.abi);
    //  defaultBarterCode = contracts.BarterContract.bin;


}

function deployTicketContract(name, description, limit) {

    var myContract = new web3client.eth.Contract(defaultTicketAbi, {
        from: addressOwner, // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });
    myContract.options.data = defaultTicketCode;

    return myContract.deploy({
        arguments: [name, description, limit]
    }).send({
        from: addressOwner,
        gas: 1500000,
        gasPrice: '30000000000000'
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
    var ticketContract = new web3.eth.contract(defaultTicketAbi, address);
    return ticketContract.methods.ticketTransfer.call(buyerAddress, ticketsCount);
}
exports.setup = setup;
exports.deployTicketContract = deployTicketContract;
exports.deployBarterContract = deployBarterContract;
exports.buyTicket = buyTicket;