const express = require('express')
const request = require('supertest');

const db = require('../src/db');

const app = express().use(express.json()).use('/', require('../src/app'))

describe('Testes de Integração DESAFIO', () => {
  
  beforeEach(async () => {
    await db.produto.destroy({ where: {} });

  });

  afterAll(async () => db.sequelize.close());

  const produtoArroz = {
    Codigo: '1',
    Descricao: 'Arroz',
    Preco: '9',
  };

  const resultadoEsperado = {
    Codigo: '1',
    Descricao: 'Arroz',
    Preco: '9',
  };


  const payloadRequest = {
    Codigo: '1',
    Descricao: 'Arroz',
    Preco: '9',
  };

  const produtoArrozPut = {
    Codigo: '1',
    Descricao: 'Arroz Carreteiro',
    Preco: '50',
  };

  const produtoArrozPutErro = {
    CodigoErro: '1',
    DescricaoErro: 'Arroz Carreteiro',
    PrecoErro: '50',
  };

  test('CENÁRIO 01: produto  GET/HTTP 200 - retorna uma lista com todos os registros de produtos encontrados', async () => {
    const res = await request(app)
      .get('/produto')
      .send({});

  expect(res.status).toBe(200);  
  });

  test('CENÁRIO 02: produto POST/HTTP 201 - realiza o cadastro de um novo produto', async () => {
    const res = await request(app)
      .post('/produto')
      .send(payloadRequest);

    //expect(res.body).toMatchSnapshot(resultadoEsperado);
    expect(res.status).toBe(201);

    const count = await db.produto.count({ where: { Codigo: produtoArroz.Codigo } });
    expect(count).toBe(1);

  });

  test('CENÁRIO 03: produto PUT/HTTP 200 - Caso já exista um produto com o mesmo código, os dados de descrição e preço deverão ser atualizados', async () => {
    await request(app)
    .post('/produto')
    .send(produtoArroz);

    const res1 = await request(app)
      .post('/produto')
      .send(produtoArroz);

    expect(res1.status).toBe(200);  
  });



  test('CENÁRIO 04: produto POST/HTTP 400 - Caso o payload da requisição seja inválido', async () => {
    const res = await request(app)
      .post('/produto')
      .send({});

    expect(res.body.erro).toBeDefined();
    expect(res.status).toBe(400);  
  });

  test('CENÁRIO 05 produto PUT/HTTP 200 - os dados de descrição e preço deverão ser atualizados e retornar HTTP 200', async () => {
    await request(app)
    .post('/produto')
    .send(produtoArroz);

    const res1 = await request(app)
      .put('/produto')
      .send(produtoArrozPut);

    expect(res1.status).toBe(200);  
  });

  test('CENÁRIO 06 produto PUT/HTTP 400 -Caso o payload da requisição seja inválido', async () => {
    const res = await request(app)
      .put('/produto')
      .send(produtoArrozPutErro);

    expect(res.body.erro).toBeDefined();
    expect(res.status).toBe(400);  
  });

  test('CENÁRIO 07 produto PUT/HTTP 405 - Caso não seja encontrado um produto com o mesmo código', async () => {
    produtoArrozPut.Codigo = "NaoExistente"
    const res = await request(app)
      .put('/produto')
      .send(produtoArrozPut);

    expect(res.body.erro).toBeDefined();
    expect(res.status).toBe(405);  
  });

  test('CENÁRIO 08 produto DELETE/HTTP 200 - deverá ser excluído o registro do produto informado', async () => {
    await request(app)
    .post('/produto')
    .send(produtoArroz);

    const res = await request(app)
      .delete('/produto')
      .send(produtoArroz);

    expect(res.status).toBe(200);   
  });

  test('CENÁRIO 09 produto DELETE/HTTP 405 - não seja encontrado um produto com o mesmo código', async () => {
    produtoArrozPut.Codigo = "NaoExistente"
    const res = await request(app)
      .delete('/produto')
      .send(produtoArrozPut);

    expect(res.body.erro).toBeDefined();
    expect(res.status).toBe(405);   
  });


});
