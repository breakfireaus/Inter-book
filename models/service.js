const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Service extends Model {}

Service.init(
  {
    //id (auto unique)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    //title of service
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //service start
    start: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },

    //service end to do
    end: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
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
    user_id: {
      type: DataTypes.INTEGER,
      //Foreign Key
      references: {
        model: 'user',
        key: 'id',
      },

      //hourly rate (list service page)
      hourly_rate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: true,
        },
      },

      //short description(list service page)
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      max_bookings: {
        type: DataTypes.NUMBER,
        allowNull: false,
        len: [2],
      },
      
    },
    cancelled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },

  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'service',
  }
);

module.exports = Service;
