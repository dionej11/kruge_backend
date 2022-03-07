const express = require('express');
const RouterCategory = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

// Middlewares
const passport = require('passport');
const { ValidateBodyCategory } = require('../middleware/types');

RouterCategory.post('/new_category',
  ValidateBodyCategory,
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    let result = await client.insertCategory(request.body, request.user.sub);
    response.json({
      result,
      message: 'CATEGORY INSERTED'
    });
  });

RouterCategory.get('/categories',
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    let result = await client.getAllCategories(request.user.sub);
    response.json({
      result,
      message: 'ALL CATEGORIES'
    });
  });

RouterCategory.get('/categories/:categoryId',
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    let result = await client.getCategory(request.params.categoryId, request.user.sub);
    response.json({
      result,
      message: 'THE CATEGORY'
    }
    );
  });

RouterCategory.put('/categories/:categoryId',
  ValidateBodyCategory,
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    let result = await client.updateCategory(request.params.categoryId, request.body, request.user.sub);
    response.json({
      result,
      message: 'CATEGORY UPDATED'
    }
    );
  });

RouterCategory.delete('/categories/:categoryId',
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    let result = await client.deleteCategory(request.params.categoryId, request.user.sub);
    response.json({
      result,
      message: 'CATEGORY DELETED'
    }
    );
  });

module.exports = RouterCategory;