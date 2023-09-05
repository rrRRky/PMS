const { DataTypes } = require("sequelize");
const sequelize = require('../Config/dbconfig'); // Import your Sequelize instance with the connection to SQL Server

const Users = sequelize.define("Users", 
{
    ID: {
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
              throw new Error('User name is required');
          }
      },
    },
  },
  UserId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Optional, adds unique constraint
    validate: {
      notEmptyOrNull(value) {
          if (value === ' ' || value === '') {
              throw new Error('UserID is required');
          }
      },
    },
  },
  SystemTypeID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
 
  RoleId: {
    type: DataTypes.INTEGER,
    allowNull: true,  
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  UserImagePath: {
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
  timestamps: false,
}
);
module.exports = Users;