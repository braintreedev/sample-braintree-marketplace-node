var express = require('express');
var router = express.Router();
var braintree = require('braintree');

var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'ffdqc9fyffn7yn2j',
    publicKey:    'qj65nndbnn6qyjkp',
    privateKey:   'a3de3bb7dddf68ed3c33f4eb6d9579ca'
});

router.get('/', function(req, res) {
  gateway.clientToken.generate({}, function(err, response) {
    var token = response.clientToken;

    res.render('index', {token : token});
  });
});

router.post('/add', function(req, res) {

  var merchant_id = req.body.merchant_id;

  var merchantAccountParams = {
    individual: {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@14ladders.com",
      phone: "5553334444",
      dateOfBirth: "1981-11-19",
      ssn: "456-45-4567",
      address: {
        streetAddress: "111 Main St",
        locality: "Chicago",
        region: "IL",
        postalCode: "60622"
      }
    },
    business: {
      legalName: "Jane's Ladders",
      dbaName: "Jane's Ladders",
      taxId: "98-7654321",
      address: {
        streetAddress: "111 Main St",
        locality: "Chicago",
        region: "IL",
        postalCode: "60622"
      }
    },
    funding: {
      descriptor: "Blue Ladders",
      destination: braintree.MerchantAccount.FundingDestination.Bank,
      email: "funding@blueladders.com",
      mobilePhone: "5555555555",
      accountNumber: "1123581321",
      routingNumber: "071101307"
    },
    tosAccepted: true,
    masterMerchantAccountId: "7dyhd98kg2tkwqtd",
    id: merchant_id
  };

  gateway.merchantAccount.create(merchantAccountParams, function (err, result) {
    res.render('addResult', {result: result});
  });

});

router.get('/find', function(req, res) {
  var merchant_id = req.query.merchant_id;

  gateway.merchantAccount.find(merchant_id, function(err, result) {
    res.render('findResult', {result: result, merchant_id: merchant_id});
  });

});

router.post('/process', function(req, res) {
  var nonce = req.body.payment_method_nonce;
  var total = req.body.total;
  var service = req.body.service;
  var merchant_id = req.body.merchant_id;

  gateway.transaction.sale({
    amount: total,
    merchantAccountId: merchant_id,
    paymentMethodNonce: nonce,
    serviceFeeAmount: service
  }, function (err, result) {
    res.render('processResult', {result: result});
  });
});

module.exports = router;