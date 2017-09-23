'use strict';

var express = require('express');
var router = express.Router();
var logger = require('../helpers/logger');


var fs = require("fs");
var path = "./backend/storage/contracts.txt";
var data = "Hello from the Node writeFile method!";

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

    logger.debug("#Create ticket contract");
    web3helper.deploy().then(function (newContractInstance) {
        console.log(newContractInstance.options.address) // instance with the new contract address
        let data = newContractInstance.options.address + "_" + params.name;
        fs.writeFile(path, data, function (error) {
            if (error) {
                res.send(JSON.stringify({ error: error }));
            } else {
                res.send(JSON.stringify({ address:  newContractInstance.options.address}));
            }
        });

        //save address to file
    });

   
})




module.exports = router;

