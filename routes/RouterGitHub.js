const express = require('express');
const passport = require('passport');
const RouterGitHub = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

const { FirmarToken } = require('../utils/jsonwebtoken');

RouterGitHub.get('/auth/github',
  passport.authenticate('GITHUB', {session: false}));

RouterGitHub.get('/auth/github/callback', 
  passport.authenticate('GITHUB', { failureRedirect: '/login', session: false  }),
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

  module.exports = RouterGitHub;