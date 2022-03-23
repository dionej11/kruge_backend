const express = require('express');
const passport = require('passport');
const RouterDiscord = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

RouterDiscord.get('/auth/discord',
  passport.authenticate('DISCORD'));

RouterDiscord.get('/auth/discord/callback', 
  passport.authenticate('DISCORD', { failureRedirect: '/login' }),
  async function(request, response) {
    
    const User = request.user;
    const UserExist = await client.getUser(User.email);

    if (UserExist) {
      response.json({user: request.user});
      //redi
    }else {
      await client.insertUser(request.user);
      response.json({user: request.user});
      //rei
    }
  }
);

  module.exports = RouterDiscord;