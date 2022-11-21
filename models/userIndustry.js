const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class UserIndustry extends Model {}

UserIndustry.init(
  {
    //id (autoincrement)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    //userid (fk)
    user_id: {
      type: DataTypes.INTEGER,
      //Foreign Key
      references: {
        model: 'User',
        key: 'id',
      },
    },

    //industry id (fk)
    industry_id: {
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
    modelName: 'UserIndustry',
  }
);

module.exports = UserIndustry;
