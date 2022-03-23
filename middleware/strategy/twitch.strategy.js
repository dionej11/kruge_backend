const { Strategy } = require('passport-twitch-new');

/**
 *  Twitch developer: https://dev.twitch.tv/
 */

const TWITCH_STRATEGY = new Strategy({
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/twitch/callback",
    scope: "user_read"
}, (accessToken, refreshToken, profile, done) => {
    
    const UserObject = {
        id: profile.id,
        name: profile.display_name,
        email: profile.email,
        photo: profile.profile_image_url,
    }

    done(null, UserObject);
})

module.exports = { TWITCH_STRATEGY };