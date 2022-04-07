const express = require('express');
const RouterTransaction = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

const passport = require('passport');
const { ValidateBodyTransaction } = require('../middleware/types');

const { changeBadge, GetValueFromAPI } = require('../utils/changeBadge');

RouterTransaction.post('/new_transaction',
  ValidateBodyTransaction,
  passport.authenticate("jwt", {session: false}),
  async (request, response) => {
    let amount = 0;
    if (request.body.badge !== "COP") {
      const valuesFromAPI = await GetValueFromAPI();
      amount = parseInt(valuesFromAPI[request.body.badge]*request.body.value);
    }else {
      amount = request.body.value;
    }
    let result = await client.insertTransaction({...request.body, amount: amount}, request.user.sub);

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
  let total_money = result[1].count - result[0].count;
  response.json({result: {...result, total_money}, message: 'TOTAL MONEY'});
});

RouterTransaction.get('/history_transactions', 
  passport.authenticate("jwt", {session: false}),
  async (request, response) => {  
  let result = await client.historyTransactions({userId: request.user.sub, category: request.body.category});
  response.json({result, message: 'TOTAL MONEY'});
});

RouterTransaction.get('/transactions_filter/:type/:mounth',
  passport.authenticate("jwt", {session: false}),
  async (request, response) => {
    let result = await client.filterByMounth(
      request.user.sub,
      request.params.type,
      request.params.mounth
    );

    let finalResult = result.map(transaction => {
      return {
        ...transaction
      }
    })

    let CategoryList = await client.getAllCategories(request.user.sub);

    const CategoryNames = CategoryList.map((category => {
      return category.name
    }))

    const SumFinal = {};

    CategoryNames.map((nameCategory) => {
      SumFinal[nameCategory] = 0;
    })

    finalResult.map((transaction) => {
      SumFinal[transaction.categoryInfo[0].name] += transaction.amount;
    })

    response.json({
      SumFinal,
      message: "FILTER TRANSACTIONS"
    })
  }
)

module.exports = RouterTransaction;