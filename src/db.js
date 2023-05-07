const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  //dialect: 'sqlite',
  dialect: 'postgres',
  host: 'db',
  port: 5555,
  database: 'consulta_credito',
  username: 'postgres',
  password: '123456',
  //storage: "./src/database.sqlite",
  logging: false,
});

const clienteModel = (sequelizeCliente, DataTypes) => {
  const Cliente = sequelizeCliente.define('Clientes', {
    CPF: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Cliente;
};

const consultaModel = (sequelizeConsulta, DataTypes) => {
  const Consulta = sequelizeConsulta.define('Consultas', {
    Valor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    NumPrestacoes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Juros: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Montante: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Prestacoes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Consulta;
};


const produtoModel = (sequelizeProduto, DataTypes) => {
  const Produto = sequelizeProduto.define('Produtos', {
    Codigo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Preco: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Produto;
};

const cliente = clienteModel(sequelize, Sequelize.DataTypes);
const consulta = consultaModel(sequelize, Sequelize.DataTypes);
const produto = produtoModel(sequelize, Sequelize.DataTypes);

cliente.hasMany(consulta, { as: 'Consultas' });
consulta.belongsTo(cliente);

module.exports = {
  cliente,
  consulta,
  produto,
  sequelize,
};
