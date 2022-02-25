const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
  
  /***************************TRANSACTION COLLECTION METHODS***************************/
  insertTransaction(data) {
    return this.connect().then((db) => {
      return db.collection('transactions').insertOne(data);
    });
  }
  getAllTransactions() {
    return this.connect().then((db) => {
      return db.collection('transactions').find().toArray();
    });
  }
  getTransaction(transactionId) {
    return this.connect().then((db) => {
      return db.collection('transactions').findOne({_id: ObjectId(transactionId)});
    });
  }
  updateTransaction(transactionId, editedTransaction) {
    return this.connect().then((db) => {
      return db.collection('transactions').updateOne(
        {_id: ObjectId(transactionId)},
        {$set: {...editedTransaction}}
      );
    });
  }
  deleteTransaction(transactionId) {
    return this.connect().then((db) => {
      return db.collection('transactions').deleteOne({_id: ObjectId(transactionId)});
    });
  }
}

module.exports = MongoDB;