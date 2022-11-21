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

//one user has many bookings
User.hasMany(Booking, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
});

Booking.belongsTo(User, {
  foreignKey: 'id',
});

//todo: one booking to one user
Booking.hasOne(User, {
  foreignKey: 'id'
});

User.belongsTo(Booking, {
  foreignKey: 'id',
});

//todo: one booking to one service
Booking.hasOne(Service, {
  foreignKey: 'id',
});

Service.belongsTo(Booking, {
  foreignKey: 'id',
});
//todo: one service can have many booking
//todo: many users to many industry

//todo: junction table for many to many relationship sql how to do it on sequelize, industry users table

module.exports = { User, UserIndustry , Booking, Service, Industry };
