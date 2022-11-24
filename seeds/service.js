const { Service } = require('../models');

const serviceData = [
  {
    id: 1,
    title: 'Salsa Dance class',
    start: '2022-12-05T12:00:000Z',
    end: '2022-12-05T12:59:000Z',
    description: 'Salsa Dance class beginners',
    industry: 1,
    user_id: 1,
    hourly_rate: 20.0,
    max_bookings: 15,
  },

  {
    id: 2,
    title: 'Bachata Dance class',
    start: '2022-12-05T13:00:00.000Z',
    end: '2022-12-05T13:59:000Z',
    description: 'Bachata Sensual class basics',
    industry: 1,
    user_id: 1,
    hourly_rate: 20.0,
    max_bookings: 15,
  },

  {
    id: 3,
    title: 'Bachata Dance class',
    start: '2022-12-05T13:00:000Z',
    end: '2022-12-05T13:59:000Z',
    description: 'Bachata Sensual class basics',
    industry: 1,
    user_id: 1,
    hourly_rate: 20.0,
    max_bookings: 15,
  },

  {
    id: 3,
    title: 'Chacha Dance class',
    start: '2022-12-05T14:00:000Z',
    end: '2022-12-05T14:59:000Z',
    description: 'Dance class',
    industry: 1,
    user_id: 2,
    hourly_rate: 20.0,
    max_bookings: 15,
  },

  {
    id: 4,
    title: 'X-train class',
    start: '2022-12-20T14:00:000Z',
    end: '2022-12-20T14:59:000Z',
    description: 'High intensity combining weights and strength',
    industry: 4,
    user_id: 4,
    hourly_rate: 20.0,
    max_bookings: 15,
  },

  {
    id: 5,
    title: 'X-train Fitness class',
    start: '2022-12-20T14:00:000Z',
    end: '2022-12-20T14:59:000Z',
    description: 'High intensity combining weights and strength',
    industry: 4,
    user_id: 5,
    hourly_rate: 20.0,
    max_bookings: 15,
  },

  {
    id: 6,
    title: 'Preliminary Advice - Immigration',
    start: '2022-12-09T14:00:000Z',
    end: '2022-12-09T14:59:000Z',
    description: 'A one hour preliminary advice',
    industry: 5,
    user_id: 6,
    hourly_rate: 350.0,
    max_bookings: 1,
  },

  {
    id: 7,
    title: 'Preliminary Developer meeting',
    start: '2022-12-07T16:00:000Z',
    end: '2022-12-07T16:59:000Z',
    description: 'A initial meeting with a developer',
    industry: 3,
    user_id: 7,
    hourly_rate: 300.0,
    max_bookings: 1,
  },
];

const seedService = () => Service.bulkCreate(serviceData);

module.exports = seedService;
