const express = require('express');
const RouterCategory = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

RouterCategory.post('/new_category', async (request, response) => {
  let result = await client.insertCategory(request.body);
  response.json({
      result, 
      message: 'CATEGORY INSERTED'
     });
});

RouterCategory.get('/categories', async (request, response) => {
  let result = await client.getAllCategories();
  response.json({
      result,
      message: 'ALL CATEGORIES'
    });
});

RouterCategory.get('/categories/:categoryId', async (request, response) => {
  let result = await client.getCategory(request.params.categoryId);
  response.json({
      result,
      message: 'THE CATEGORY'}
      );
});

RouterCategory.put('/categories/:categoryId', async (request, response) => {
  let result = await client.updateCategory(request.params.categoryId, request.body);
  response.json({
      result,
      message: 'CATEGORY UPDATED'}
      );
});

RouterCategory.delete('/categories/:categoryId', async (request, response) => {
  let result = await client.deleteCategory(request.params.categoryId);
  response.json({
      result,
      message: 'CATEGORY DELETED'}
      );
});

module.exports = RouterCategory;