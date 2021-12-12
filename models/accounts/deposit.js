const { ObjectId } = require('mongodb');
const connection = require('../connection');
const { getByCPF } = require('../clients');
const { create } = require('../transactions')

const update = async (cpf, value) => {
  const db = await connection();
  let client = await getByCPF(cpf);
  const newBalace = parseFloat(client.balance) + parseFloat(value);
  await db.collection('clients').updateOne(
    { cpf: cpf }, { $set: { balance: newBalace } },
  );
  client = await getByCPF(cpf);
  delete client.password;
  await create(client.cpf, null, value);
  return client;
};

module.exports = update;