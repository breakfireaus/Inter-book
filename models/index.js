const Booking = require('./booking');
const Industry = require('./industry');
const Service = require('./service');
const User = require('./user');
const UserIndustry = require('./userIndustry');

//One user can make many services
User.hasMany(Service, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Service.belongsTo(User, {
  foreignKey: 'user_id',
});

//one user can make many bookings
User.hasMany(Booking, {
  foreignKey: 'client_id',
  onDelete: 'CASCADE',
});

Booking.belongsTo(User, {
  foreignKey: 'client_id',
});

//one service can have many booking
Service.hasMany(Booking, {
  foreignKey: 'service_id',
  onDelete: 'CASCADE',
});

Booking.belongsTo(Service, {
  foreignKey: "service_id"
});

//many users to many industry
User.belongsToMany(Industry, {
  // Define the third table needed to store the foreign keys
  through: {
    model: UserIndustry,
    unique: false,
  },
});

Industry.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: UserIndustry,
    unique: false,
  },
});
module.exports = { User, UserIndustry, Booking, Service, Industry };
