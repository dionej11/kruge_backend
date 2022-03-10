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
  let badge = {USD: 3700, MXN: 200, EUR: 4200}, totalMoney = 0;
  let result = await client.totalMoney(request.user.sub);
  result.map(transaction => {
    if(transaction.badge !== "COP") {
      totalMoney += transaction.amount*badge[transaction.badge];  
    }
    else {
      totalMoney += transaction.amount;
    }
  })
  response.json({result: totalMoney, message: 'TOTAL MONEY'});
});

RouterTransaction.get('/history_transactions', 
  passport.authenticate("jwt", {session: false}),
  async (request, response) => {  
  let result = await client.historyTransactions({userId: request.user.sub, category: request.body.category});
  response.json({result, message: 'TOTAL MONEY'});
});

module.exports = RouterTransaction;