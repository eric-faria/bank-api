const { ObjectId } = require('mongodb');
const connection = require('../connection');
const { getByCPF } = require('../clients');

const update = async (cpf, value) => {
  const db = await connection();
  let client = await getByCPF(cpf);
  const newBalace = parseFloat(client.balance) + parseFloat(value);
  await db.collection('clients').updateOne(
    { cpf: cpf }, { $set: { balance: newBalace } },
  );
  client = await getByCPF(cpf);
  delete client.password;
  return client;
};

module.exports = update;