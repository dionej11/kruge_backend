const express = require('express');
const RouterUsers = express.Router();

const MongoDB = require('../mongodb/client');
const cliente = new MongoDB();

RouterUsers.post('/login', async (request, response) => {
  let result = await cliente.pruebita(request.body.nameCat);
  response.json({
    result,
    msj: 'hola funcionó el gatito'
  })
});

module.exports = RouterUsers;