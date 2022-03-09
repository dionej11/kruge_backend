const express = require('express');
const RouterTransaction = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

const passport = require('passport');
const { ValidateBodyTransaction } = require('../middleware/types');


RouterTransaction.post('/new_transaction',
  ValidateBodyTransaction,
  passport.authenticate("jwt", {session: false}),
  async (request, response) => {
    let result = await client.insertTransaction(request.body, request.user.sub);
    response.json({result, message: 'TRANSACTION INSERTED'});
});

RouterTransaction.get('/transactions',
  passport.authenticate("jwt", {session: false}),
  async (request, response) => {
  let result = await client.getAllTransactions(request.user.sub);
  response.json({result, message: 'ALL TRANSACTIONS'});
});

RouterTransaction.get('/transactions/:transactionId',
  passport.authenticate("jwt", {session: false}), 
  async (request, response) => {
  let result = await client.getTransaction(request.params.transactionId, request.user.sub);
  response.json({result, message: 'THE TRANSACTION'});
});

RouterTransaction.put('/transactions/:transactionId', 
  ValidateBodyTransaction,
  passport.authenticate("jwt", {session: false}),
  async (request, response) => {
  let result = await client.updateTransaction(request.params.transactionId, request.body, request.user.sub);
  response.json({result, message: 'TRANSACTION UPDATED'});
});

RouterTransaction.delete('/transactions/:transactionId', 
  passport.authenticate("jwt", {session: false}),
  async (request, response) => {
  let result = await client.deleteTransaction(request.params.transactionId, request.user.sub);
  response.json({result, message: 'TRANSACTION DELETED'});
});

RouterTransaction.get('/total_money', 
  passport.authenticate("jwt", {session: false}),
  async (request, response) => {
  let result = await client.totalMoney(request.user.sub);
  //aca se haria la parte de la conversión de las divisas que se tengan diferentes a la ya configurada
  response.json({result, message: 'TOTAL MONEY'});
});

module.exports = RouterTransaction;