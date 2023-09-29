
const { Sequelize } = require("sequelize");

const config = new Sequelize
({
  dialect: "mssql", 
  username: 'userit',
  password: '@serit',
  host: 'jydbsrvr',
  database: 'JAY_PMS',
  dialectOptions:
    {
      options: 
      {
        encrypt: true, // Use this if you're using Azure SQL Database
      },
    },
  });
 
  module.exports = config;  