const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.URI_MONGODB;

class MongoDB {
  constructor() {
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    this.name = 'Kruge';
  }
  connect() {
    if (!this.connection) {
      this.connection = new Promise((resolve, reject)=>{
        this.client.connect(err => {
          if (err) {
            reject(err);
          }
          console.log('Manguito conectado correctamente :D');
          resolve(this.client.db(this.name));
        });
      })
    }
    return this.connection;
  }
  pruebita(nameCat) {
    return this.connect().then((db) => {
      let gatito = {
        nombre: nameCat,
        vidas: 4
      }
      return db.collection('gatitos').insertOne(gatito);
    });
  }
}

module.exports = MongoDB;