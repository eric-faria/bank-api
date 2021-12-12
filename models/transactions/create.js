const connection = require('../connection');

const create = async (cpf, to, value) => {
  const db = await connection();
  await db.collection('transactions').insertOne({ origin: cpf, destination: to, value });  
};

module.exports = create;