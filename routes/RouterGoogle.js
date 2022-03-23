const express = require('express');
const passport = require('passport');
const RouterGoogle = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

RouterGoogle.get('/auth/google',
  passport.authenticate('GOOGLE', { scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ]})
);

RouterGoogle.get('/auth/google/callback', 
  passport.authenticate('GOOGLE', { failureRedirect: '/404' }),
  async function(request, response) {
    // Successful authentication, redirect home.
    // response.redirect('/home:P');
    let { name, given_name, family_name, picture, email } = request.user._json;

    if (client.getUser(email)) {
      response.json({user: request.user});
      //redi
    }else {
      await client.insertUser({name, given_name, family_name, picture, email});
      response.json({user: request.user});
      //rei
    }

  }
);

module.exports = RouterGoogle;
