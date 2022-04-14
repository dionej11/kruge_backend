const express = require('express');
const passport = require('passport');
const servidor = express();
const CORS = require('cors');

servidor.use(CORS());

require('dotenv').config();

servidor.use (passport.initialize());

require('./middleware');

const { GetValueFromAPI } = require('./utils/changeBadge');

servidor.use(express.json());

servidor.use(require('./routes/RouterUsers'));
servidor.use(require('./routes/RouterCategory'));
servidor.use(require('./routes/RouterTransaction'));
servidor.use(require('./routes/RouterGoogle'));
servidor.use(require('./routes/RouterGitHub'));
servidor.use(require('./routes/RouterDiscord'));
servidor.use(require('./routes/RouterTwitch'));

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