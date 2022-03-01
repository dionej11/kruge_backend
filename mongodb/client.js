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

  /***************************CATEGORY COLLECTION METHODS***************************/
  insertCategory(data) {
    return this.connect().then((db) => {
      return db.collection('category').insertOne(data);
    });
  }
  getAllCategories() {
    return this.connect().then((db) => {
      return db.collection('category').find().toArray();
    });
  }
  getCategory(categoryId) {
    return this.connect().then((db) => {
      return db.collection('category').findOne({_id: ObjectId(categoryId)});
    });
  }
  updateCategory(categoryId, editedCategory) {
    return this.connect().then((db) => {
      return db.collection('category').updateOne(
        {_id: ObjectId(categoryId)},
        {$set: {...editedCategory}}
      );
    });
  }
  deleteCategory(categoryId) {
    return this.connect().then((db) => {
      return db.collection('category').deleteOne({_id: ObjectId(categoryId)});
    });
  }

  /***************************USERS COLLECTION METHODS***************************/
  insertUser(data) {
    return this.connect().then((db) => {
      return db.collection('users').insertOne(data);
    });
  }
  getAllUsers() {
    return this.connect().then((db) => {
      return db.collection('users').find().toArray();
    });
  }
  getUser(userId) {
    return this.connect().then((db) => {
      return db.collection('users').findOne({_id: ObjectId(userId)});
    });
  }
  updateUser(userId, editedUser) {
    return this.connect().then((db) => {
      return db.collection('users').updateOne(
        {_id: ObjectId(userId)},
        {$set: {...editedUser}}
      );
    });
  }
  deleteUser(userId) {
    return this.connect().then((db) => {
      return db.collection('users').deleteOne({_id: ObjectId(userId)});
    });
  }
}

module.exports = MongoDB;