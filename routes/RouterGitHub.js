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
    let UserExist = await client.getUser(User.email);
    
    if (!UserExist) {
      await client.insertUser(request.user);
      UserExist = await client.getUser(User.email);
    }

    let token = FirmarToken(UserExist);
    
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

  module.exports = RouterGitHub;