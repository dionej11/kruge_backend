const express = require('express');
const RouterUsers = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

// RouterUsers.post('/login', async (request, response) => {
//   let result = await cliente.pruebita(request.body.nameCat);
//   response.json({
//     result,
//     msj: 'hola funcionó el gatito'
//   })
// });

RouterUsers.post('/new_user', async (request, response) => {
  let result = await client.insertUser(request.body);
  response.json({result, message: 'USER INSERTED'});
});

RouterUsers.get('/users', async (request, response) => {
  let result = await client.getAllUsers();
  response.json({result, message: 'ALL USERS'});
});

RouterUsers.get('/users/:userId', async (request, response) => {
  let result = await client.getUser(request.params.userId);
  response.json({result, message: 'THE USER'});
});

RouterUsers.put('/users/:userId', async (request, response) => {
  let result = await client.updateUser(request.params.userId, request.body);
  response.json({result, message: 'USER UPDATED'});
});

RouterUsers.delete('/users/:userId', async (request, response) => {
  let result = await client.deleteUser(request.params.userId);
  response.json({result, message: 'USER DELETED'});
});

module.exports = RouterUsers;