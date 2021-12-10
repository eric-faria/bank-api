const { MongoClient } = require('mongodb');

const MONGO_DB_URL = `mongodb://localhost:27017/BankAPI`;
const DB_NAME = 'BankAPI';

let connection = null;

const connect = async () => {
  try {
    connection = connection || (connection = (await MongoClient.connect(
        MONGO_DB_URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      )).db(DB_NAME));
    return connection;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connect;