const express = require('express');
const passport = require('passport');
const servidor = express();
const cookieSession = require('cookie-session');

require('dotenv').config();

servidor.use(cookieSession({
  name: "session",
  keys: ["google", "github", "discord"],
  maxAge: 24 * 60 * 60 * 1000
}))

servidor.use (passport.initialize());
servidor.use(passport.session());

require('./middleware');

const { GetValueFromAPI } = require('./utils/changeBadge');

servidor.use(express.json());

servidor.use(require('./routes/RouterUsers'));
servidor.use(require('./routes/RouterCategory'));
servidor.use(require('./routes/RouterTransaction'));
servidor.use(require('./routes/RouterGoogle'));

servidor.get('/', (request, response) =>{
  console.log('hola mundito desde nodemon');
  response.json({
    saludo: `holisss 🤕`
  })
})

// Ruta para consultar el valor de las divisas
servidor.get('/exchange', async (req, res) => {
  const result = await GetValueFromAPI();
  res.json({
    result
  })
})

servidor.listen(3000, () => console.log(`server corriendo en ${3000}`));