const { DataTypes } = require("sequelize");
const sequelize = require('../Config/dbconfig'); // Import your Sequelize instance with the connection to SQL Server

const RoleModuleFunctions = sequelize.define("RoleModuleFunctions", 
{
    Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  
  ModuleFunctionID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
 
  RoleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
 
  IsApplicable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, 
{
  timestamps: false,
}
);
module.exports = RoleModuleFunctions;