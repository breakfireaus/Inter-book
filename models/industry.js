const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Industry extends Model {}

Industry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    industry: {
      type: DataTypes.STRING,
      allowNull: false,
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

module.exports = Industry;
