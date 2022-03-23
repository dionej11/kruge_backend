const { Strategy } = require('passport-github2');

/**
 *  GitHub: https://github.com/settings/developers
 */

const GITHUB_STRATEGY = new Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback",
    scope: ['user', 'user:email']
  },
  function(accessToken, refreshToken, profile, done) {
    const UserObject = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos[0].value,
    }

    done(null, UserObject);
  }
);

module.exports = { GITHUB_STRATEGY };