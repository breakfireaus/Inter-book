//todo: import bcrypt to hash the words before create and before update hook for passwords
//class method to compare password to hash
//refer to bcrypt documentation and class materials



const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class User extends Model {}

User.init(
  {
    // user id (auto)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    

    //Email address (signup)
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isEmail: true
      }
    },

    //Password
    password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    
    //Description (update profile page)
    description: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
    
    //Industry (update profile page)(FK)
    industry: {
        type: DataTypes.INTEGER,
        //Foreign Key
        references: {
          model: 'User',
          key: 'id',
        },
    },
  },

  {
    hooks: {

    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User',
  }
  );

  module.exports = User;

