const bcrypt = require('bcrypt');

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class User extends Model {

  async checkPassword (passwordCompare) {
    return await bcrypt.compare(passwordCompare, this.password);
  } 
}


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
      validate: {
        isEmail: true,
      },
    },

    //Password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [8,12],
    },

    //Description (update profile page)
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  },

  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.password) {
          updatedUserData.password = await bcrypt.hash(
            updatedUserData.password,
            10
          );
        }
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
