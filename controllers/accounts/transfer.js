const { StatusCodes } = require('http-status-codes');
const service = require('../../services/accounts');

const transfer = async (req, res, next) => {
  try {
    const { to, value } = req.body;
    const { authorization } = req.headers;

    const client = await service.transfer(to, value, authorization); 
    res.status(StatusCodes.OK).send({
        ...client,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = transfer;