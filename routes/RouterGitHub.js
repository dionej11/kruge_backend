const express = require('express');
const passport = require('passport');
const RouterGitHub = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

RouterGitHub.get('/auth/github',
  passport.authenticate('GITHUB'));

RouterGitHub.get('/auth/github/callback', 
  passport.authenticate('GITHUB', { failureRedirect: '/login' }),
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

  module.exports = RouterGitHub;