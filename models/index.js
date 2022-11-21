const Booking = require('./booking');
const Industry = require('./industry');
const Services = require('./service');
const User = require('./user');


      

User.hasMany(services, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
  });
  
Booking.belongsTo(users, {
    foreignKey: 'id',
  });

module.exports = { , , };
