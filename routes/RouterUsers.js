const express = require('express');
const RouterUsers = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

const JSONWEBTOKEN = require('jsonwebtoken');

const passport = require('passport');

RouterUsers.post('/login', async (request, response) => {
  let user = await client.getUser(request.body.userEmail);
  if (user) {
    let token = JSONWEBTOKEN.sign({ sub: user._id, nameUser: user.name }, process.env.JWTPASSWORD);
    response.json({ user, token, message: 'USER LOGED' });
  }
  else {
    response.json({ message: 'USER NOT FOUND :P' });
  }
});

RouterUsers.post('/new_user', async (request, response) => {
  let result = await client.insertUser(request.body);
  response.json({ result, message: 'USER INSERTED' });
});

RouterUsers.get('/users', async (request, response) => {
  let result = await client.getAllUsers();
  response.json({ result, message: 'ALL USERS' });
});

RouterUsers.get('/users/:userEmail', async (request, response) => {
  let result = await client.getUser(request.params.userEmail);
  response.json({ result, message: 'THE USER' });
});

RouterUsers.put('/users/:userId',
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    let result = await client.updateUser(request.params.userId, request.body);
    response.json({ result, message: 'USER UPDATED' });
  });

RouterUsers.delete('/users/:userId',
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    let result = await client.deleteUser(request.params.userId);
    response.json({ result, message: 'USER DELETED' });
  });

module.exports = RouterUsers;