const Booking = require('./booking');
const Industry = require('./industry');
const Service = require('./service');
const User = require('./user');
const UserIndustry = require('./userIndustry')

User.hasMany(Service, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
});

Service.belongsTo(User, {
  foreignKey: 'id',
});

//todo: junction table for many to many relationship sql how to do it on sequelize, industry users table
//todo: one user many bookings
//todo: one booking to one user
//todo: one booking to one service
//todo: one service can have many booking
//todo: many users to many industry

module.exports = { User, UserIndustry , Booking, Service, Industry };
