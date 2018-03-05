var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlTransaction = require('../controllers/transaction');
var ctrlAuth = require('../controllers/authentication');
var ctrlProfile = require('../controllers/profile');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

router.post('/transactions/buyToken', ctrlTransaction.buyToken);
router.post('/transactions/sellToken', ctrlTransaction.sellToken);
router.post('/transactions/transferToken', ctrlTransaction.transferToken);

router.get('/transactions/history', ctrlTransaction.getHistory);
router.get('/transactions/getTotalSale', ctrlTransaction.getTotalSale);
router.get('/transactions/getTotalSaleToday', ctrlTransaction.getTotalSaleToday);
router.post('/transactions/getCurrentUserSale', ctrlTransaction.getCurrentUserSale);

// authentication
router.post('/users/register', ctrlAuth.register);
router.post('/users/login', ctrlAuth.login);
router.post('/users/update_profile', auth, ctrlProfile.profileUpdate);


module.exports = router;
