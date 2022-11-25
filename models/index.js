const Booking = require('./booking');
const Industry = require('./industry');
const Service = require('./service');
const User = require('./user');
const UserIndustry = require('./userIndustry');

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

//one booking to one user
Booking.hasOne(User, {
  foreignKey: 'id',
});

User.belongsTo(Booking, {
  foreignKey: 'id',
});

//one booking to one service
Booking.hasOne(Service, {
  foreignKey: 'id',
});

Service.belongsTo(Booking, {
  foreignKey: 'id',
});
//one service can have many booking
Service.hasMany(Booking, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
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
