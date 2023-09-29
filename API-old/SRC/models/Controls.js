const { DataTypes } = require("sequelize");
const sequelize = require('../Config/dbconfig'); // Import your Sequelize instance with the connection to SQL Server

const Controls = sequelize.define("Controls", 
{
    Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  
  ControlName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Optional, adds unique constraint
    validate: {
      notEmptyOrNull(value) {
          if (value === ' ' || value === '') {
              throw new Error('Control name is required');
          }
      },
    },
    
  },

  Type: {
    type: DataTypes.STRING,
    allowNull: false,
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
  timestamps: false,
}
);
module.exports = Controls;