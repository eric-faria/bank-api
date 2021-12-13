const frisby = require('frisby');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const CPF = require('cpf');

chai.use(chaiHttp);
const { expect } = chai;

const mongoDbUrl = process.env.DB_URL || `mongodb://localhost:27017/`;
const url = process.env.APP_URL || 'http://localhost:3000';

describe('POST /clients/', () => {
  let connection;
  let db;

  before(async () => {
    connection = (await MongoClient.connect(
      mongoDbUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ))
    db = await connection.db('BankAPI');
    });
 

  beforeEach(async () => {
    await db.collection('clients').deleteMany({});
  });

  after(async () => {
    await connection.close();
  });

  it('quando é criado com sucesso', async () => {
    await frisby
      .post(`${url}/clients/`,
        {
            name: 'Elon Musk',
            cpf: CPF.generate(),
            password: 'senha123'
        })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).to.have.property('_id');
        expect(result).to.have.property('name');
        expect(result).to.have.property('cpf');
        expect(result).to.have.property('balance');
      });
  });

  it('ERRO: CPF em branco', async () => {
    await frisby
      .post(`${url}/clients/`,
        {
            name: 'Elon Musk',
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
      .post(`${url}/clients/`,
        {
            name: 'Elon Musk',
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

  it('ERRO: name em branco', async () => {
    await frisby
      .post(`${url}/clients/`,
        {
            name: '',
            cpf: '352.194.810-29',
            password: 'senha123'
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).to.equal('All fields must be filled.');
      });
  });

  it('ERRO: CPF inválido', async () => {
    await frisby
      .post(`${url}/clients/`,
        {
            name: 'Elon Musk',
            cpf: '123.456.789-10',
            password: 'senha123'
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).to.equal('Invalid CPF. Try again.');
      });
  });

  

});