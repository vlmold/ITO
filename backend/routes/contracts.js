'use strict';

var express = require('express');
var router = express.Router();
var logger = require('../helpers/logger');


var fs = require("fs");
var path = "./backend/storage/contracts.txt";

var web3helper = require('../helpers/web3helper');
/**
 * Get All Current Products
 */
router.get("/", function (req, res) {

    logger.debug("### Get all Contracts in System");
    var contracts = [];
    res.send(contracts)
});


router.post("/", function (req, res) {

    let params = req.body;
    let name = params.name;
    let limit = params.limit;
    let description = params.description;
    logger.debug("#Create ticket contract");
    web3helper.deployTicketContract(name, description, limit).then(function (newContractInstance) {
        console.log(newContractInstance.options.address) // instance with the new contract address
        let data = newContractInstance.options.address + "_" + params.name;
        fs.writeFile(path, data, function (error) {
            if (error) {
                res.send(JSON.stringify({ error: error }));
            } else {
                res.send(JSON.stringify({ address: newContractInstance.options.address }));
            }
        });
    });
});



module.exports = router;

