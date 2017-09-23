var Web3 = require('web3');
var fs = require('fs');
var web3client;
var defaultTicketAbi;
var defaultTicketCode;

var addressOwner = "0x0199d879e78c8057fe75d9ab8458fd745e55f5c0";


function setup() {
    if (typeof web3client !== 'undefined') {
        web3client = new Web3(web3client.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3client = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    let source = fs.readFileSync("./contracts/contracts.json");
    let contracts = JSON.parse(source)["contracts"];

    defaultTicketAbi = JSON.parse(contracts.SampleContract.abi);
    defaultTicketCode = contracts.SampleContract.bin;
}

function get() {

}
function deployContract() {

    var myContract = new web3client.eth.Contract(defaultTicketAbi, {
        from: addressOwner, // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });
    myContract.options.data = defaultTicketCode;

    return myContract.deploy({
        arguments: []
    }).send({
        from: addressOwner,
        gas: 1500000,
        gasPrice: '30000000000000'
    });


}
exports.setup = setup;
exports.deploy = deployContract;