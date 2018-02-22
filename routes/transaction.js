const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Transaction = require('../models/transaction');

var Web3 = require('web3');
var contract = require("truffle-contract");
var path = require('path');
var InrtTokenJSON  = require(path.join(__dirname, '../build/contracts/InrtToken.json'));

// Setup RPC connection
var provider    = new Web3.providers.HttpProvider("http://localhost:8545");
var InrtTokenContract = contract(InrtTokenJSON);
InrtTokenContract.setProvider(provider);

//register test for user
router.post('/buyToken', (req, res, next) => {
  console.log("data" , req.body);

  let buyToken = new Transaction({
    userId:req.body.email,
    amount:req.body.amount,
    address:req.body.address,
    status:0
  });

  var address = "0xaae21f51886478a1b1c1d15c8968709d1214a039";
  var amount = 200;

  // Use Truffle as usual
  InrtTokenContract.deployed().then(function(instance) {
    return instance.transfer.call(address, amount, { gas: 200000 });
  }).then(function(result) {
    console.log(result);
    Transaction.buyToken(buyToken, (err, data) => {
      console.log("" + err +" " + data);
      if (err) {
        res.json({success: false, msg: 'Failed To Registered User'});
      } else {
        res.json({success: true, msg: "User Registered..."});
      }
    });
  }, function(error) {
    console.log(error);
  });
});

module.exports = router;
