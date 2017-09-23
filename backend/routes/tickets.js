'use strict';

var express = require('express');
var router = express.Router();
var logger = require('../helpers/logger');


var fs = require("fs");
var path = "./backend/storage/tickets.txt";

var web3helper = require('../helpers/web3helper');

router.get("/", function (req, res) {

    logger.debug("### Get all tickets for user");
    var contracts = [];
    res.send(contracts)
});


router.post("/", function (req, res) {

    let params = req.body;

    logger.debug("#buy ticket");
    
    let address = params.address;
    let contractAddress = params.contractAddress;
    let numberOfTickets = params.numberOfTickets;

    web3helper.buyTicket(contractAddress, address, numberOfTickets).then((result)=>{
        res.send(result);
    });

});



module.exports = router;

