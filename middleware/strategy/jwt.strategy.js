const { Strategy, ExtractJwt } = require('passport-jwt');
const JWTSTRATEGY = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTPASSWORD
}, (bodyToken, done)=> done(null, bodyToken));

module.exports = {JWTSTRATEGY};