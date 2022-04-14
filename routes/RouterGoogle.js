const express = require('express');
const passport = require('passport');
const RouterGoogle = express.Router();

const MongoDB = require('../mongodb/client');
const client = new MongoDB();

const { FirmarToken } = require('../utils/jsonwebtoken');

RouterGoogle.get('/auth/google',
  passport.authenticate('GOOGLE', { scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ], session: false})
);

RouterGoogle.get('/auth/google/callback', 
  passport.authenticate('GOOGLE', { failureRedirect: '/404', session: false }),
  async function(request, response) {
    // Successful authentication, redirect home.
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

module.exports = RouterGoogle;
