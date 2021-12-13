const frisby = require('frisby');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);
const { expect } = chai;

const mongoDbUrl = process.env.DB_URL || `mongodb://localhost:27017/`;
const url = process.env.APP_URL || 'http://localhost:3000';
describe('GET /history', () => {
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
    await db.collection('transactions').deleteMany({});
    const transactions = [
        {
            origin: "352.194.810-29",
            destination: "880.137.510-74",
            value: 400
        },
        {
            origin: "352.194.810-29",
            destination: null,
            value: 200
        }
    ];
    await db.collection('transactions').insertMany(transactions);
    const clients = [
      {
       name: 'Elon Musk',
       cpf: '352.194.810-29',
       password: 'senha123',
       balance: 1000
      },
      {
         name: 'Bill Gates',
         cpf: '880.137.510-74',
         password: 'senha123',
         balance: 0
        }
     ];
      await db.collection('clients').insertMany(clients);
  });
  


  after(async () => {
    await connection.close();
  });

  it('quando é retornado com sucesso', async () => {
    await frisby
      .post(`${url}/login/`, {
        cpf: '880.137.510-74',
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
          .get(`${url}/history`,
          {
            
          })
          .expect('status', 200)
          .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result).to.have.length(1);
        });
     });
  });

  it('ERRO: não autenticado', async () => {
    await frisby
        .get(`${url}/history`,
          {
            
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
          .get(`${url}/history`,
          {
           
          })
          .expect('status', 401)
          .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).to.equal('jwt malformed');
        });
  });
});