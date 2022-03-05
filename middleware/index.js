const passport = require('passport');
const {JWTSTRATEGY} = require('./strategy/jwt.strategy');

passport.use(JWTSTRATEGY);