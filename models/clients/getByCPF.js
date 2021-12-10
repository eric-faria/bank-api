const connection = require('../connection');

const getByCPF = async (cpf) => {
  const res = await (await connection()).collection('clients').findOne({ cpf });

  if (!res) return null;

  return res;
};

module.exports = getByCPF;