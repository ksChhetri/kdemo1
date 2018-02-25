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
    status: {
      type: Number,
      require: true
    }
});

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);

// module.exports.getUserById = function (id, callback) {
//     User.findById(id, callback);
// }
module.exports.getHistory = function (callback) {
    Transaction.find({}, callback);
}

//
// module.exports.getUserByUsername = function (username, callback) {
//     const query = { username: username }
//     User.findOne(query, callback);
// }

module.exports.buyToken = function (buyData, callback) {
  buyData.save(callback);
}

module.exports.sellToken = function (sellData, callback) {
  sellData.save(callback);
}

module.exports.transferToken = function (transferData, callback) {
  transferData.save(callback);
}

// module.exports.comparePassword = function (candidatePassword, hash, callback) {
//     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//         if (err) return callback(err, null);/*throw err;*/
//         callback(null, isMatch);
//     });
// }
