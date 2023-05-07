const express = require('express');

const app = express();

const { check, validationResult } = require('express-validator');

const consultaCliente = require('./consulta-cliente');
const consultaProduto = require('./consulta-produto');

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send('Bootcamp desenvolvedor back end - Tópicos especiais!');
});

app.post(
  '/consulta-credito',

  check('nome', 'Nome deve ser informado').notEmpty(),
  check('CPF', 'CPF deve ser informado').notEmpty(),
  check('valor', 'O valor deve ser um número').notEmpty().isFloat(),
  check('parcelas', 'O número de parcelas deve ser um número inteiro').notEmpty().isInt(),

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {
      const valores = await consultaCliente.consultar(
        req.body.nome,
        req.body.CPF,
        req.body.valor,
        req.body.parcelas,
      );
      return res.status(201).json(valores);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  },
);


//====================================================================================================================================================================================================================================================================
//====================================================================================================================================================================================================================================================================
//====================================================================================================================================================================================================================================================================
//====================================================================================================================================================================================================================================================================
//====================================================================================================================================================================================================================================================================
//====================================================================================================================================================================================================================================================================
//====================================================================================================================================================================================================================================================================
//====================================================================================================================================================================================================================================================================


app.get(
  '/produto',

  /*check('Codigo', 'Codigo deve ser informado').notEmpty(),
  check('Descricao', 'Descricao deve ser informado').notEmpty(),
  check('Preco', 'O preco deve ser um número').notEmpty().isFloat(),*/

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {
      const valores = await consultaProduto.consultar();
      return res.status(201).json(valores);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  },
);



app.post(
  '/produto',

  check('Codigo', 'Codigo deve ser informado').notEmpty(),
  check('Descricao', 'Descricao deve ser informado').notEmpty(),
  check('Preco', 'O preco deve ser um número').notEmpty().isFloat(),

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {
      const existeProduto = await consultaProduto.consultarUm(
        req.body.Codigo,
        req.body.Descricao,
        req.body.Preco,
      );

      if (existeProduto){
        const produtoAtualizado = await consultaProduto.atualizar(
          req.body.Codigo,
          req.body.Descricao,
          req.body.Preco,
          );
        return res.status(200).json(produtoAtualizado);
      }

      const valores = await consultaProduto.create(
        req.body.Codigo,
        req.body.Descricao,
        req.body.Preco,
        );
      return res.status(201).json(valores);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  },
);

app.put(
  '/produto',

  check('Codigo', 'Codigo deve ser informado').notEmpty(),
  check('Descricao', 'Descricao deve ser informado').notEmpty(),
  check('Preco', 'O preco deve ser um número').notEmpty().isFloat(),

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {
      const valores = await consultaProduto.atualizar(
        req.body.Codigo,
        req.body.Descricao,
        req.body.Preco,
        );
      return res.status(200).json(valores);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  },
);

app.delete(
  '/produto',

  check('Codigo', 'Codigo deve ser informado').notEmpty(),
  /*check('Descricao', 'Descricao deve ser informado').notEmpty(),
  check('Preco', 'O preco deve ser um número').notEmpty().isFloat(),*/

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {

      const valores = await consultaProduto.deletar(
        req.body.Codigo,
        req.body.Descricao,
        req.body.Preco,
        );
      return res.status(200).json(valores);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  },
);

module.exports = app;