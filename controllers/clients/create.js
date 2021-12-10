const { StatusCodes } = require('http-status-codes');
const service = require('../../services/clients');

const create = async (req, res, next) => {
  try {
    const { name, cpf, password } = req.body;
    const client = await service.create(name, cpf, password); 
    res.status(StatusCodes.CREATED).send({
        ...client,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = create;