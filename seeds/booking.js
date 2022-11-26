const { Booking } = require('../models');

const bookingData = [
  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 1,
    service_id: 1,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 1,
    service_id: 2,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 1,
    service_id: 3,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 1,
    service_id: 4,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 1,
    service_id: 5,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 2,
    service_id: 6,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 2,
    service_id: 7,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 1,
    service_id: 8,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 3,
    service_id: 3,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 2,
    service_id: 5,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 4,
    service_id: 3,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 4,
    service_id: 1,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 4,
    service_id: 2,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 3,
    service_id: 4,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 3,
    service_id: 2,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 5,
    service_id: 3,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 5,
    service_id: 3,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 5,
    service_id: 4,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 5,
    service_id: 2,
  },

  {
    cancelled: 'false',
    confirmed: 'true',
    client_id: 5,
    service_id: 5,
  },
];

const seedBooking = () => Booking.bulkCreate(bookingData);

module.exports = seedBooking;
