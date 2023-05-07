const express = require('express')
const request = require('supertest');

const db = require('../src/db');

const app = express().use(express.json()).use('/', require('../src/app'))

describe('Testes de Integração DESAFIO', () => {
  
  beforeEach(async () => {
    await db.produto.destroy({ where: {} });
  });

  afterAll(async () => db.sequelize.close());

  const produtoJoao = {
    Codigo: '1',
    Descricao: 'Arroz',
    Preco: '9',
  };

  const resultadoEsperado = {
    montante: 106.9,
    juros: 0.025,
    parcelas: 3,
    primeiraPrestacao: 35.64,
    prestacoes: [35.64, 35.63, 35.63],
  };

  const payloadRequest = {
    nome: produtoJoao.Nome,
    CPF: produtoJoao.CPF,
    valor: 101.75,
    parcelas: 3,
  };

  test('responder http 200 na raiz - Versão 01', () => request(app).get('/')
    .then((res) => expect(res.status).toBe(200)));

  test('responder http 200 na raiz - Versão 02', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  
  // O teste abaixo está errando, porém passando com sucesso, pois não suporta
  // o comportamento assíncrono da chamada HTTP realizada. O mesmo deveria
  // falhar, uma vez que a aplicação retorna HTTP 200,
  // ao passo que o teste está aguardando um HTTP 400.
  //
  // test('responder http 200 na raiz - Versão COM ERRO', () => {
  //   request(app).get('/')
  //     .then((res) => expect(res.status).toBe(400));
  // });
/*
  test('CENÁRIO 01', async () => {
    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    // Resultado é obtido com sucesso
    expect(res.body.erro).toBeUndefined();
    expect(res.body.montante).toBe(106.9);
    expect(res.status).toBe(201);
    expect(res.body).toMatchSnapshot(resultadoEsperado);
    expect(res.body).toMatchObject(resultadoEsperado);

    // produto foi armazenado
    const produto = await db.produto.findOne({ where: { CPF: produtoJoao.CPF } });
    expect(produto.CPF).toBe(produtoJoao.CPF);

    const consulta = await db.consulta.findOne({ where: { produtoCPF: produtoJoao.CPF } });
    expect(consulta.Valor).toBe(101.75);
  });

  */
/*
  test('CENÁRIO 02', async () => {

    await db.produto.create({
      Nome:produtoJoao.Nome,
      CPF:produtoJoao.CPF
    });

    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);


    expect(res.body).toMatchSnapshot(resultadoEsperado);
    expect(res.status).toBe(201);

    const count = await db.consulta.count({ where: { produtoCPF: produtoJoao.CPF } });
    expect(count).toBe(2);
  });

  */
/*
  test('CENÁRIO 03', async () => {
    const res1 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    expect(res1.body).toMatchSnapshot(resultadoEsperado);

    const res2 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    // Resultado é obtido
    console.log(res2.body)
    expect(res2.body.erro).toBeDefined();
    expect(res2.status).toBe(405);
  });
*/

  /*
  test('CENÁRIO 04', async () => {
    const res = await request(app)
      .post('/consulta-credito')
      .send({});

    // Resultado é obtido
    expect(res.body.erro).toBeDefined();
    expect(res.status).toBe(400);
  });

  */

});


