//id (autoincrement)
//userid (fk)
//industry id (fk)

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class UserIndustry extends Model {}

UserIndustry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      //Foreign Key
      references: {
        model: 'User',
        key: 'id',
      },
    },

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
