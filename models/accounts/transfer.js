const { ObjectId } = require('mongodb');
const connection = require('../connection');
const { getByCPF } = require('../clients');
const { create } = require('../transactions')

const transfer = async (cpf, to, value) => {
  const db = await connection();
  let client = await getByCPF(cpf);
  const destination = await getByCPF(to);
  const newBalace = parseFloat(client.balance) - parseFloat(value);
  await db.collection('clients').updateOne(
    { cpf: cpf }, { $set: { balance: newBalace } },
  );
  const newBalaceDest = parseFloat(destination.balance) + parseFloat(value);
  await db.collection('clients').updateOne(
    { cpf: to }, { $set: { balance: newBalaceDest } },
  );
  client = await getByCPF(cpf);
  delete client.password;
  await create(cpf, to, value);
  return client;
};

module.exports = transfer;