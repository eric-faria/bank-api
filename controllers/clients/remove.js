const { StatusCodes } = require('http-status-codes');
const service = require('../../services/clients');


const remove = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    await service.remove(authorization); 
    res.status(StatusCodes.GONE).send({});
  } catch (error) {
    next(error);
  }
};

module.exports = remove;