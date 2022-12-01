const Booking = require('./booking');
const Industry = require('./industry');
const Service = require('./service');
const User = require('./user');
const UserIndustry = require('./userIndustry');

User.hasMany(Service, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Service.belongsTo(User, {
  foreignKey: 'user_id',
});

//one user has many bookings
User.hasMany(Booking, {
  foreignKey: 'client_id',
  onDelete: 'CASCADE',
});

Booking.belongsTo(User, {
  foreignKey: 'client_id',
});

//one booking to one user
// Booking.hasOne(User, {
//   foreignKey: 'id',
// });

// User.belongsTo(Booking, {
//   foreignKey: 'id',
// });

// //one booking to one service
// Service.hasMany(Booking, {
//   foreignKey: 'id',
// });

// Service.belongsTo(Booking, {
//   foreignKey: 'id',
// });
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
