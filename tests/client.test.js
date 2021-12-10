const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const CPF = require('cpf');
const server = require('../index');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /clients/', () => {
  describe('quando é criado com sucesso', () => {
        let response = {};
        const DBServer = new MongoMemoryServer();
        
        before(async () => {
            const URLMock = await DBServer.getUri();
            const connectionMock = await MongoClient.connect(URLMock,
                { useNewUrlParser: true, useUnifiedTopology: true }
                );
                
                sinon.stub(MongoClient, 'connect')
                .resolves(connectionMock);
                
                response = await chai.request(server)
                .post('/clients/')
                .send({
                    name: 'Elon Musk',
                    cpf: '352.194.810-29',
                    password: 'senha123'
                });
            });
            
            after(async () => {
                MongoClient.connect.restore();
                await DBServer.stop();
            });
            
            it('retorna o código de status 201', () => {
                expect(response).to.have.status(201);
            });
            
            it('retorna um objeto', () => {
                expect(response.body).to.be.a('object');
            });
            
            it('o objeto possui a propriedade "_id"', () => {
                expect(response.body).to.have.property('_id');
            });
            
            it('o objeto possui a propriedade "name"', () => {
                expect(response.body).to.have.property('name');
            });
            
            it('o objeto possui a propriedade "cpf"', () => {
                expect(response.body).to.have.property('cpf');
            });
            
            it('o objeto possui a propriedade "balance"', () => {
                expect(response.body).to.have.property('balance');
            });
            
  });

  describe('ERRO: nome em branco', () => {
            let response = {};
            const DBServer = new MongoMemoryServer();

    before(async () => {
        const URLMock = await DBServer.getUri();
        const connectionMock = await MongoClient.connect(URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true }
        );

        sinon.stub(MongoClient, 'connect')
          .resolves(connectionMock);
        
          response = await chai.request(server)
            .post('/clients/')
            .send({
                name: '',
                cpf: CPF.generate(),
                password: 'senha123'
            });
    });

    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "All fields must be filled."',
            () => {
                expect(response.body.message)
                    .to.be.equal('All fields must be filled.');
            }
        );
    
  });

  describe('ERRO: CPF em branco', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
        const URLMock = await DBServer.getUri();
        const connectionMock = await MongoClient.connect(URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true }
        );

        sinon.stub(MongoClient, 'connect')
          .resolves(connectionMock);
        
          response = await chai.request(server)
            .post('/clients/')
            .send({
                name: 'Elon Musk',
                cpf: '',
                password: 'senha123'
            });
    });

    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "All fields must be filled."',
            () => {
                expect(response.body.message)
                    .to.be.equal('All fields must be filled.');
            }
        );
    
  });

  describe('ERRO: password em branco', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
        const URLMock = await DBServer.getUri();
        const connectionMock = await MongoClient.connect(URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true }
        );

        sinon.stub(MongoClient, 'connect')
          .resolves(connectionMock);
        
          response = await chai.request(server)
            .post('/clients/')
            .send({
                name: 'Elon Musk',
                cpf: CPF.generate(),
                password: ''
            });
    });

    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "All fields must be filled."',
      () => {
        expect(response.body.message)
          .to.be.equal('All fields must be filled.');
      }
    );
    
  });

  describe('ERRO: CPF inválido', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
        const URLMock = await DBServer.getUri();
        const connectionMock = await MongoClient.connect(URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true }
        );

        sinon.stub(MongoClient, 'connect')
          .resolves(connectionMock);
        
          response = await chai.request(server)
            .post('/clients/')
            .send({
                name: 'Elon Musk',
                cpf: '12345',
                password: 'senha123'
            });
    });

    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "Invalid CPF. Try again."',
            () => {
                expect(response.body.message)
                    .to.be.equal('Invalid CPF. Try again.');
            }
        );
    
  });

  
});