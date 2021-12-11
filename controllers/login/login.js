const { StatusCodes } = require('http-status-codes');
const service = require('../../services/login');

const login = async (req, res, next) => {
  try {
    const { cpf, password } = req.body;

    if (!cpf || !password) {
        return res.status(StatusCodes.BAD_REQUEST).send({
            message: 'All fields must be filled.',
        }); 
    }
    
    const response = await service.login(cpf, password);
    
    if (response.err) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: response.message,
      });
    }

    return res.status(StatusCodes.OK).send({
      token: response.token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;