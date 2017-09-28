'use strict';

var express = require('express');
var router = express.Router();
var logger = require('../helpers/logger');


var fs = require("fs");
var path = "./storage/users.txt";

var web3helper = require('../helpers/web3helper');


router.post("/", function (req, res) {

    let params = req.body;

    logger.debug("#buy ticket");

    let address = params.userAddress;
    let contractAddress = params.contractAddress;
    let ticketId = params.ticketId;

    web3helper.buyTicket(contractAddress, address, ticketId).then((result) => {
        if (result.transactionHash !== undefined) {
            return res.send(JSON.stringify({ hash: result.transactionHash }));
        } else {
            res.sendStatus(500);
        }

    });
});
router.post("/exchange", function (req, res) {

    let params = req.body;

    logger.debug("#buy ticket");

    let contractAddress1 = params.firstContractAddress;
    let ticketId1 = params.firstTicketId;
    let contractAddress2 = params.secondContractAddress;
    let ticketId2 = params.secondTicketId;

    web3helper.exchangeTickets(contractAddress1, contractAddress2, ticketId1, ticketId2).then((result) => {
        if (result.transactionHash !== undefined) {
            return res.send(JSON.stringify({ hash: result.transactionHash }));
        } else {
            res.sendStatus(500);
        }
    });
});
router.get("/", function (req, res) {

    let params = req.query;

    logger.debug("#get ticket");
    let contractAddress = params.contractAddress;
    let ticket = params.id;
    web3helper.getTickets(contractAddress, ticket).then((address) => {
        //get name by address
        var result = fs.readFileSync(path, "utf8");
        var arrayOfLines = result.match(/[^\r\n]+/g);

        var user = {}
        if (arrayOfLines) {
            arrayOfLines.forEach(function (line) {
                let addr = line.split('_')[0];
                if (addr.toLowerCase() === address.toLowerCase()) {
                    user = { address: line.split('_')[0], name: line.split('_')[1] };
                }

            }, this);
        }
        res.send(user);
    });

});

module.exports = router;

