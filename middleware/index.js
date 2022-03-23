const passport = require('passport');
const { JWTSTRATEGY } = require('./strategy/jwt.strategy');
const { PASSPORTGOOGLE } = require('./strategy/google.strategy');
const { GITHUB_STRATEGY } = require('./strategy/github.strategy');
const { DISCORD_STRATEGY } = require('./strategy/discord.strategy');
const { TWITCH_STRATEGY } = require('./strategy/twitch.strategy');

// Manejo de sesión mediante Passport
passport.serializeUser((user, done) => {
  done(null, user)
});

passport.deserializeUser((user, done) => {
  done(null, user)
});

passport.use(JWTSTRATEGY);

passport.use("GOOGLE", PASSPORTGOOGLE);
passport.use("GITHUB", GITHUB_STRATEGY);
passport.use("DISCORD", DISCORD_STRATEGY);
passport.use("TWITCH", TWITCH_STRATEGY);