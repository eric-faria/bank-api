const { StatusCodes } = require('http-status-codes');
const service = require('../../services/transactions');

const getAll = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const transactions = await service.getAll(authorization); 
    res.status(StatusCodes.OK).send(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;