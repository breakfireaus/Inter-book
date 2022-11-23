const { Service } = require('../models');

const serviceData = [
  {
    id: 1,
    service_title: 'Dance class',
    service_start: 2022-12-05,
    service_end: 2022-12-05,
    service_desc: 'Dance class',
    industry: 1,
    user_id: 1,
    hourly_rate: 20.00
  },
]

const seedService = () => Service.bulkCreate(serviceData);

module.exports = seedService;