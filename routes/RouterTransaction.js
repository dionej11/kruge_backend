const express = require('express');
const RouterTransaction = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

const passport = require('passport');
const { ValidateBodyTransaction } = require('../middleware/types');

const { changeBadge } = require('../utils/changeBadge');

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
        ...transaction,
        amount: transaction.badge === "COP" ? transaction.amount : changeBadge(transaction.amount, transaction.badge)
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