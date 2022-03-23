const passport = require('passport');
const {JWTSTRATEGY} = require('./strategy/jwt.strategy');
const {PASSPORTGOOGLE} = require('./strategy/google.strategy');

// Manejo de sesión mediante Passport
passport.serializeUser((user, done) => {
  done(null, user)
});

passport.deserializeUser((user, done) => {
  done(null, user)
});

passport.use(JWTSTRATEGY);
passport.use("GOOGLE",PASSPORTGOOGLE);