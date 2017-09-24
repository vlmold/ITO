var Web3 = require('web3');
var fs = require('fs');
var web3client;
var defaultTicketAbi;
var defaultTicketCode;
var defaultBarterAbi;
var defaultBarterCode;
var addressOwner;
var privateKey;
var logger = require('./logger');
var path = "./storage/contracts.txt";
function setup(owner, key) {
    if (typeof web3client !== 'undefined') {
        web3client = new Web3(web3client.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3client = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    //
    //clear storage
    addressOwner = owner;
    privateKey = key;
    fs.unlinkSync(path);
    fs.closeSync(fs.openSync(path, 'w'));
    //unlock account 

    //web3client.eth.personal.unlockAccount(addressOwner, privateKey);

    let source = fs.readFileSync("../contracts/contracts.json");
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
        arguments: [2]
    }).send({
        from: addressOwner,
        gas: 1500000,
        gasPrice: '300000'
    });
}
function buyTicket(contractAddress, buyerAddress, ticketId) {
    var ticketContract = new web3client.eth.Contract(defaultTicketAbi, contractAddress);
    return new Promise((resolve, reject) => {

        ticketContract.methods.transfer(buyerAddress, ticketId).send({ from: buyerAddress }).then(function (result) {
            logger.debug(result);
            resolve(result);
        });
    })

}
function getTickets(contractAddress) {
    var ticketContract = new web3client.eth.Contract(defaultTicketAbi, contractAddress);
    return new Promise((resolve, reject) => {
        ticketContract.methods.ticketMap(1).call({ from: addressOwner }).then(function (result) {
            logger.debug(result);
            resolve(result);
        });
    })

}
function exchangeTickets(contract1address, contract2address, firstTicketId1, firstTicketId2) {
    //get user1 address


    var ticket1Contract = new web3client.eth.Contract(defaultTicketAbi, contract1address);
    return new Promise((resolve, reject) => {
        ticketContract.methods.ticketMap(firstTicketId1).call({ from: addressOwner }).then(function (address1) {
            //uesr 1 address    
            logger.debug(address1);
            var ticket2Contract = new web3client.eth.Contract(defaultTicketAbi, contract2address);
            ticketContract.methods.ticketMap(firstTicketId2).call({ from: addressOwner }).then(function (address2) {
                //uesr 1 address    
                logger.debug(address2);


                deployBarterContract().then((barterContract) => {
                    console.log(barterContract.options.address) // instance with the new contract address
                    barterContract.methods.setProposal(0, contract1address, ticket1Contract, address1, address2).send({ from: address1 }).then(function (result1) {
                        logger.debug(result1);
                        barterContract.methods.setProposal(1, contract2address, ticket2Contract, address2, address1).send({ from: address2 }).then(function (result) {
                            logger.debug(result2);
                            barterContract.methods.finalizeProposals().send({ from: address1 }).then(function (result) {
                                logger.debug(result);
                                resolve(result);
                            });
                        });
                    });
                });
            })
        });
    });




}

exports.setup = setup;
exports.deployTicketContract = deployTicketContract;
exports.deployBarterContract = deployBarterContract;
exports.buyTicket = buyTicket;
exports.getTickets = getTickets;