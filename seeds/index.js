const sequelize = require('../config/connection');
const seedIndustry = require('./industry');
const seedUser = require('./user');
const seedService = require('./service');
const seedBooking = require('./booking');
const seedUserIndustry = require('./userIndustry');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedIndustry();

  await seedUser();

  await seedService();

  await seedBooking();

  await seedUserIndustry();

  process.exit(0);
};

seedAll();
