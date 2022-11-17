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

    bookingtime: {
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
    modelName: 'product',
  }
);

module.exports = booking;
// service (fk)
// client id (fk user) (from session, booking time and length)
// booking time (booking page)
// booking length (booking page)
