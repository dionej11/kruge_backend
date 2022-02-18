const express = require('express');
const servidor = express();
require('dotenv').config();

servidor.use(express.json());

servidor.use(require('./routes/RouterUsers'));
servidor.use(require('./routes/RouterCategory'));
servidor.use(require('./routes/RouterTransaction'));

servidor.get('/', (request, response) =>{
  console.log('hola mundito desde nodemon');
  response.json({
    saludo: `holisss 🤕`
  })
})

servidor.listen(3000, () => console.log(`server corriendo en ${3000}`));