



//hourly cost (list service page)
//short description(list service page)
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class service extends Model {}

service.init(
  {
    //id (auto unique)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    //title of service 
    service_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //availability
    availability: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    //industry (fk)
    industry: {
        type: DataTypes.INTEGER,
        //Foreign Key
        references: {
          model: 'industry',
          key: 'id',
        },
    },

    //freelancer(fk) (list service page)
    freelancer: {
        type: DataTypes.INTEGER,
        //Foreign Key
        references: {
          model: 'users',
          key: 'id',
        },

    //hourly rate (list service page)
    hourly_rate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        },

    //short description(list service page)
    service_desc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        }, 
    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'service',
  }
  );

  module.exports = service;