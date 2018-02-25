const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Transaction = require('../models/transaction');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var Web3 = require('web3');
var contract = require("truffle-contract");
var path = require('path');
var InrtTokenJSON  = require(path.join(__dirname, '../build/contracts/InrtToken.json'));

// Setup RPC connection
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//var InrtTokenContract = contract(InrtTokenJSON);
//InrtTokenContract.setProvider(web3);

//console.log(InrtTokenJSON.abi);
var inrtTokenContractAddress = "0xD57045EDe87d81b7DC4126D9cF946CB0393CB425";
var InrtTokenContract = web3.eth.contract(InrtTokenJSON.abi).at(inrtTokenContractAddress);

module.exports.buyToken = function(req, res) {
  console.log(req.body);

  var _address = req.body.data.address;
  var _amount = req.body.data.amount;
  var _userid = req.body.user_details.email;

  let buyToken = new Transaction({
    userId: _userid,
    address: _address,
    amount: _amount,
    status: 0
  });

  Transaction.buyToken(buyToken, (err, data) => {
      if (err) {
        res.json({success: false, msg: 'Failed To Create Order'});
      } else {
        web3.eth.getAccounts((error, accounts) => {
          InrtTokenContract.transfer.sendTransaction(_address, _amount , { from: accounts[0], gas: 200000},
            function (error, result) {
              if(!error) {
                console.log(result);
                res.json({success: true, msg: "INRT sent to your address", transactionHash: result});
              } else {
                console.log(error);
                res.json({success: false, msg: "Failed To Send INRT"});
              }
            }
          );
       });
      }
  });

  //console.log(web3.eth.getBalance("0x899e387fa02c247a378ab0f85a01b1ba8f21be4f"));
  // console.log("ad: " + _address + " s:  " + _amount);

  // Use Truffle as usual
  // InrtTokenContract.deployed().then(function(instance) {
  //   return instance.transfer.call(address, amount, { gas: 300000, from: Web3.eth.accounts[0] });
  // }).then(function(result) {
  //   console.log(result);
  //   Transaction.buyToken(buyToken, (err, data) => {
  //     console.log("" + err +" " + data);
  //     if (err) {
  //       res.json({success: false, msg: 'Failed To Registered User'});
  //     } else {
  //       res.json({success: true, msg: "User Registered..."});
  //     }
  //   });
  // }, function(error) {
  //   console.log(error);
  // });
};


module.exports.sellToken = function(req, res) {
  var _address = req.body.data.address_sell;
  var _amount = req.body.data.amount_sell;
  var _userid = req.body.user_details.email;

  let sellToken = new Transaction({
    userId: _userid,
    address: _address,
    amount: _amount,
    status: 0
  });

  Transaction.sellToken(sellToken, (err, data) => {
      if (err) {
        res.json({success: false, msg: 'Failed To Create Order'});
      } else {
        res.json({success: true, msg: "Sell order Created", data: data, tokenContractAbi: InrtTokenJSON.abi,
         tokenContractAddress: inrtTokenContractAddress, toAddress : "0x84A3231874cF31ad1272932b71aBA0F0a0e0AF00"});
      }
  });
};

module.exports.transferToken = function(req, res) {
  var _address = req.body.data.trasfer_to_address;
  var _amount = req.body.data.trasfer_amount;
  var _userid = req.body.user_details.email;

  let transferToken = new Transaction({
    userId: _userid,
    address: _address,
    amount: _amount,
    status: 0
  });

  Transaction.transferToken(transferToken, (err, data) => {
      if (err) {
        res.json({success: false, msg: 'Failed To Create Order'});
      } else {
        res.json({success: true, msg: "Transfer token order created", data: data, tokenContractAbi: InrtTokenJSON.abi,
         tokenContractAddress: inrtTokenContractAddress, toAddress : _address});
      }
  });
};

module.exports.getHistory = function(req, res) {
  console.log("getHistory");
  Transaction.getHistory((err, data) => {
      if (err) {
        res.json({success: false, msg: 'Failed To Get History'});
      } else {
        res.json({success: true, msg: data});
      }
  });
};
