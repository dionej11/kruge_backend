const GitHubStrategy = require('passport-github2');

const GITHUB_STRATEGY = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(profile);
  }
);

module.exports = { GITHUB_STRATEGY };