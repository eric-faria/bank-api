const frisby = require('frisby');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);
const { expect } = chai;

const mongoDbUrl = `mongodb://localhost:27017/`;
const url = 'http://localhost:3000';

describe('POST /login/', () => {
  let connection;
  let db;

  before(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('BankAPI');
  });

  beforeEach(async () => {
    await db.collection('clients').deleteMany({});
    const clients = {
      name: 'Elon Musk',
      cpf: '352.194.810-29',
      password: 'senha123'
    };
    await db.collection('clients').insertOne(clients);
  });

  after(async () => {
    await connection.close();
  });

  it('quando é logado com sucesso', async () => {
    await frisby
      .post(`${url}/login/`,
        {
          cpf: '352.194.810-29',
          password: 'senha123'
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).to.have.property('token');
      });
  });

  it('ERRO: CPF em branco', async () => {
    await frisby
      .post(`${url}/login/`,
        {
          cpf: '',
          password: 'senha123'
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).to.equal('All fields must be filled.');
      });
  });

  it('ERRO: password em branco', async () => {
    await frisby
      .post(`${url}/login/`,
        {
          cpf: '352.194.810-29',
          password: ''
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).to.equal('All fields must be filled.');
      });
  });

  it('ERRO: usuário inválido', async () => {
    await frisby
      .post(`${url}/login/`,
        {
          cpf: '352.194.810-23',
          password: 'senha123'
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).to.equal('Incorrect username or password');
      });
  });

  it('ERRO: password inválido', async () => {
    await frisby
      .post(`${url}/login/`,
        {
          cpf: '352.194.810-29',
          password: '123senha'
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).to.equal('Incorrect username or password');
      });
  });

});
    

