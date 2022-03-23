const { Strategy } = require('passport-google-oauth20');

const PASSPORTGOOGLE = new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    cb(null, profile);
  }
);
module.exports = {PASSPORTGOOGLE};
