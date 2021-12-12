const connection = require('../connection');

const remove = async (cpf) => {
    const db = await connection();
    await db.collection('clients').deleteOne(
        { cpf: cpf },
      );
};

module.exports = remove;