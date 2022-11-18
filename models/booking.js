const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class booking extends Model {}

booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    booking_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    booking_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    client_id: {
      type: DataTypes.INTEGER,
      //Foreign Key
      references: {
        model: 'users',
        key: 'id',
      },
    },

    service_id: {
      type: DataTypes.INTEGER,
      //Foreign Key
      references: {
        model: 'service',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'booking',
  }
);

module.exports = booking;

