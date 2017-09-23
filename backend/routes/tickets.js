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
    
    let address = params.userAddress;
    let contractAddress = params.contractAddress;
    let numberOfTicket = params.numberOfTicket;

    web3helper.buyTicket(contractAddress, address, numberOfTicket).then((result)=>{
        res.send(result);
    });

});

router.get("/", function (req, res) {
    
        let params = req.body;

        logger.debug("#get ticket");
        let contractAddress = params.contractAddress;
        let address = params.address;    
        web3helper.getTickets(contractAddress).then((result)=>{
            res.send(result);
        });
    
    });

module.exports = router;

