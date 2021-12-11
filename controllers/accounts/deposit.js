const { StatusCodes } = require('http-status-codes');
const service = require('../../services/accounts');

const deposit = async (req, res, next) => {
  try {
    const { value } = req.body;
    const { authorization } = req.headers;

    const client = await service.deposit(value, authorization); 
    res.status(StatusCodes.OK).send({
        ...client,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deposit;