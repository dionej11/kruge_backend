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
    let UserExist = await client.getUser(User.email);
    
    if (!UserExist) {
      await client.insertUser(request.user);
      UserExist = await client.getUser(User.email);
    }

    let token = FirmarToken(UserExist);
    
    // response.cookie("JWT", token);
    // response.redirect(`${process.env.REDIRECT_URL}/home`);
    response.status(200).send(`<!DOCTYPE html>
    <html lang="en">
    <body>
    </body>
    <script>
            window.opener.postMessage(${JSON.stringify(token)}, 'http://localhost:3001')
        </script>
    </html>`)
  }
);

module.exports = RouterGoogle;
