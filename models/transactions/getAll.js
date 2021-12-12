const connection = require('../connection');

const getAll = async (cpf) => {
  const db = await connection();
  const data = await db.collection('transactions').find().toArray();
  const res = data.filter(e => e.origin === cpf || e.destination === cpf);
  return res;
};

module.exports = getAll;
