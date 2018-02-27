const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//create user schema
const TransactionSchema = mongoose.Schema({
    userId: {
      type: String,
      require: true
    },
    amount: {
      type: Number,
      require: true
    },
    address: {
      type: String,
      require: true
    },
    date: {
       type: Date,
       default: Date.now
    },
    t_type: {
      type: String,
      require: true
    },
    status: {
      type: Number,
      require: true
    }
});

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);

module.exports.getHistory = function (callback) {
    Transaction.find({}, callback);
}

module.exports.buyToken = function (buyData, callback) {
  buyData.save(callback);
}

module.exports.sellToken = function (sellData, callback) {
  sellData.save(callback);
}

module.exports.transferToken = function (transferData, callback) {
  transferData.save(callback);
}

module.exports.updateStatus = function (data, callback) {
  data.update(callback);
}
