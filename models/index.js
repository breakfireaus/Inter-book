const booking = require('./booking');
const industry = require('./industry');
const services = require('./service');
const user = require('./users');


      

user.hasMany(services, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
  });
  
booking.belongsTo(users, {
    foreignKey: 'id',
  });

module.exports = { , , };
