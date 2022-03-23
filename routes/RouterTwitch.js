const express = require('express');
const passport = require('passport');
const RouterTwitch = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

RouterTwitch.get('/auth/twitch',
  passport.authenticate('TWITCH'));

RouterTwitch.get('/auth/twitch/callback', 
  passport.authenticate('TWITCH', { failureRedirect: '/login' }),
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

  module.exports = RouterTwitch;