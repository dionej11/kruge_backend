const express = require('express');
const passport = require('passport');
const RouterDiscord = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

const { FirmarToken } = require('../utils/jsonwebtoken');

RouterDiscord.get('/auth/discord',
  passport.authenticate('DISCORD', {session: false}));

RouterDiscord.get('/auth/discord/callback', 
  passport.authenticate('DISCORD', { failureRedirect: '/login', session: false  }),
  async function(request, response) {
    
    const User = request.user;
    const UserExist = await client.getUser(User.email);

    let token = FirmarToken(UserExist);

    if (UserExist) {
      response.cookie("JWT", token);
      response.redirect(`${process.env.REDIRECT_URL}/home`);
    }else {
      response.cookie("JWT", token);
      await client.insertUser(request.user);
      response.redirect(`${process.env.REDIRECT_URL}/home`);
    }
  }
);

  module.exports = RouterDiscord;