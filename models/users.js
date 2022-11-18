

//Industry (update profile page)(FK)
//services offered( related to services 1:M)

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class users extends Model {}

industry.init(
  {
    // user id (auto)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    //Email address (signup)
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
          model: 'industry',
          key: 'id',
        },
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'industry',
  }
  );

  module.exports = industry;

