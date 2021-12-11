const frisby = require('frisby');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);
const { expect } = chai;

const mongoDbUrl = `mongodb://localhost:27017/`;
const url = 'http://localhost:3000';

describe('POST /accounts/deposit/', () => {
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
      password: 'senha123',
      balance: 0
    };
    await db.collection('clients').insertOne(clients);
  });

  after(async () => {
    await connection.close();
  });

  it('quando é depositado com sucesso', async () => {
    await frisby
      .post(`${url}/login/`, {
        cpf: '352.194.810-29',
        password: 'senha123',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/accounts/deposit`,
          {
            value: 200
          })
          .expect('status', 200)
          .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.balance).to.equal(200);
        });
   });
  });

  it('ERRO: não autenticado', async () => {
    await frisby
        .post(`${url}/accounts/deposit`,
          {
            value: 200
          })
          .expect('status', 401)
          .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).to.equal('missing auth token');
        });
  });

  it('ERRO: token inválido', async () => {
    await frisby
          .setup({
            request: {
              headers: {
                Authorization: "fake-token",
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/accounts/deposit`,
          {
            value: 200
          })
          .expect('status', 401)
          .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).to.equal('jwt malformed');
        });
  });

  it('ERRO: valor não informado', async () => {
    await frisby
      .post(`${url}/login/`, {
        cpf: '352.194.810-29',
        password: 'senha123',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/accounts/deposit`,
          {
            
          })
          .expect('status', 400)
          .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).to.equal('Value must be filled.');
        });
   });
  });

  it('ERRO: valor negativo', async () => {
    await frisby
      .post(`${url}/login/`, {
        cpf: '352.194.810-29',
        password: 'senha123',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/accounts/deposit`,
          {
             "value": -1
          })
          .expect('status', 400)
          .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).to.equal('Invalid value. Try again.');
        });
   });
  });

  it('ERRO: valor acima de 2000', async () => {
    await frisby
      .post(`${url}/login/`, {
        cpf: '352.194.810-29',
        password: 'senha123',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/accounts/deposit`,
          {
             "value": 2001
          })
          .expect('status', 400)
          .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).to.equal('Invalid value. Try again.');
        });
   });
  });
});