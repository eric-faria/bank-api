const { StatusCodes } = require('http-status-codes');

const checkToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
      message: 'missing auth token',
    });   
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkToken;
