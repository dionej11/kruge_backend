const express = require('express');
const passport = require('passport');
const RouterTwitch = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

const { FirmarToken } = require('../utils/jsonwebtoken');

RouterTwitch.get('/auth/twitch',
  passport.authenticate('TWITCH', { session: false }));

RouterTwitch.get('/auth/twitch/callback', 
  passport.authenticate('TWITCH', { failureRedirect: '/login', session: false  }),
  async function(request, response) {
    
    const User = request.user;
    let UserExist = await client.getUser(User.email);
    
    if (!UserExist) {
      await client.insertUser(request.user);
      UserExist = await client.getUser(User.email);
    }

    let token = FirmarToken(UserExist);
    
    response.cookie("JWT", token);
    response.redirect(`${process.env.REDIRECT_URL}/home`);
  }
);

  module.exports = RouterTwitch;