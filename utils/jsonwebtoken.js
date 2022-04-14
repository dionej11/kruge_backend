const JSONWEBTOKEN = require('jsonwebtoken');

function FirmarToken(User) {
  let token = JSONWEBTOKEN.sign({ 
      sub: User._id,
      nameUser: User.name
    }, process.env.JWTPASSWORD);

  return token;
}

module.exports = { FirmarToken }