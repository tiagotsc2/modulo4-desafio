const db = require("./db");

//createProduto(Codigo, Descricao, Preco)

const consultar = async (Codigo, Descricao, Preco) => {
  let produto = await db.produto.findAll({
    //where: { Codigo },
  });

  return produto;
};

const consultarUm = async (Codigo, Descricao, Preco) => {
  let produto = await db.produto.findOne({
    where: { Codigo },
  });

  return produto;
};

const create = async (Codigo, Descricao, Preco) => {
  const novoProduto = {
    Codigo: Codigo,
    Descricao: Descricao,
    Preco: Preco,
  };

  let produto = await db.produto.create(novoProduto);

  return produto;
};

const atualizar = async (Codigo, Descricao, Preco) => {
  
  const novoProduto = await db.produto.findOne({
    where: { Codigo },
  });
  
  

  if (!novoProduto) {
    throw new Error(`Impossível atualizar Produto, registro ${Codigo} não encontrado`);
  } 
    
    produto = {
      Codigo: Codigo,
      Descricao: Descricao,
      Preco: Preco,
    };

    try {
      await db.produto.update(produto, {
          where: {
            Codigo
          }
      });
      //return await getClient(client.clientId);
      return consultar(Codigo, Descricao, Preco)
  } catch (err) {
      throw err;
  }

};


const deletar = async (Codigo) => {
  const ultimaConsulta = await db.produto.findOne({
    where: { Codigo },
  });

  if (!ultimaConsulta) {
    throw new Error(`Impossível deletar Produto, registro ${Codigo} não encontrado`);
  }
  await db.produto.destroy({
    where: { Codigo}
  });

};


module.exports = {
  consultar,
  create,
  atualizar,
  deletar,
  consultarUm
};
