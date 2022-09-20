const { Strategy } = require('passport-google-oauth20');

/**
 *  Google Cloud: https://console.cloud.google.com/apis/credentials
 */

const PASSPORTGOOGLE = new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.REDIRECT_OAUTH}/google/callback`
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
module.exports = {PASSPORTGOOGLE};
