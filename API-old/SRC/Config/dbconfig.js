const Ms_Sql = require('mssql');
const { Sequelize } = require("sequelize");

const config = new Sequelize({
  dialect: "mssql", 
  username: 'userit',
  password: '@serit',
  host: 'jydbsrvr',
  database: 'JAY_PMS',
  dialectOptions:{
    //   trustedconnection:true,
    //   enableArithAbort:true,
    // // instancename:'MSSQLSERVER2'
    // "encrypt": false
    options: {
      encrypt: true, // Use this if you're using Azure SQL Database
    },
  },
  });
 
  module.exports = config;  