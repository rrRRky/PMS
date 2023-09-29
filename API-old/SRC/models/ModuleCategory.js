const { DataTypes } = require("sequelize");
const sequelize = require('../Config/dbconfig'); // Import your Sequelize instance with the connection to SQL Server

const ModuleCategory = sequelize.define("ModuleCategory", 
{
  ID: 
  {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Optional, adds unique constraint
    validate: {
      notEmptyOrNull(value) {
          if (value === ' ' || value === '') {
              throw new Error('ModuleCategory name is required');
          }
      },
    },
  },
  RoutingPage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  IconUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CreatedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  CreatedOn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UpdatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  UpdatedOn: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, 
{
  tableName: "ModuleCategory",
  timestamps: false,
}
);
module.exports = ModuleCategory;