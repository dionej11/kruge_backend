const express = require('express');
const RouterTransaction = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

RouterTransaction.post('/new_transaction', async (request, response) => {
  let result = await client.insertTransaction(request.body);
  response.json({result, message: 'TRANSACTION INSERTED'});
});

RouterTransaction.get('/transactions', async (request, response) => {
  let result = await client.getAllTransactions();
  response.json({result, message: 'ALL TRANSACTIONS'});
});

RouterTransaction.get('/transactions/:transactionId', async (request, response) => {
  let result = await client.getTransaction(request.params.transactionId);
  response.json({result, message: 'THE TRANSACTION'});
});

RouterTransaction.put('/transactions/:transactionId', async (request, response) => {
  let result = await client.updateTransaction(request.params.transactionId, request.body);
  response.json({result, message: 'TRANSACTION UPDATED'});
});

RouterTransaction.delete('/transactions/:transactionId', async (request, response) => {
  let result = await client.deleteTransaction(request.params.transactionId);
  response.json({result, message: 'TRANSACTION DELETED'});
});

module.exports = RouterTransaction;