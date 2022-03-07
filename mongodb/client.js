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
  insertTransaction(data, userId) {
    return this.connect().then((db) => {
      return db.collection('transactions').insertOne({...data, idOwner:  ObjectId(userId)});
    });
  }
  getAllTransactions(userId) {
    return this.connect().then((db) => {
      return db.collection('transactions').find({idOwner: ObjectId(userId)}).toArray();
    });
  }
  getTransaction(transactionId, userId) {
    return this.connect().then((db) => {
      return db.collection('transactions').findOne({_id: ObjectId(transactionId), idOwner: ObjectId(userId)});
    });
  }
  updateTransaction(transactionId, editedTransaction, userId) {
    return this.connect().then((db) => {
      return db.collection('transactions').updateOne(
        {_id: ObjectId(transactionId), idOwner: ObjectId(userId)},
        {$set: {...editedTransaction}}
      );
    });
  }
  deleteTransaction(transactionId, userId) {
    return this.connect().then((db) => {
      return db.collection('transactions').deleteOne({_id: ObjectId(transactionId), idOwner: ObjectId(userId)});
    });
  }

  /***************************CATEGORY COLLECTION METHODS***************************/
  insertCategory(data, userId) {
    return this.connect().then((db) => {
      return db.collection('category').insertOne({...data, idOwner:  ObjectId(userId)});
    });
  }
  getAllCategories(userId) {
    return this.connect().then((db) => {
      return db.collection('category').find({idOwner:  ObjectId(userId)}).toArray();
    });
  }
  getCategory(categoryId, userId) {
    return this.connect().then((db) => {
      return db.collection('category').findOne({_id: ObjectId(categoryId), idOwner:  ObjectId(userId)});
    });
  }
  updateCategory(categoryId, editedCategory, userId) {
    return this.connect().then((db) => {
      return db.collection('category').updateOne(
        {_id: ObjectId(categoryId), idOwner:  ObjectId(userId)},
        {$set: {...editedCategory}}
      );
    });
  }
  deleteCategory(categoryId, userId) {
    return this.connect().then((db) => {
      return db.collection('category').deleteOne({_id: ObjectId(categoryId), idOwner:  ObjectId(userId)});
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
  getUser(userEmail) {
    return this.connect().then((db) => {
      return db.collection('users').findOne({email: userEmail});
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