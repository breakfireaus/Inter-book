const { Booking } = require('../models');

const bookingData = [
  {
    id: 1,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 1,
    service_id: 1,
  },

  {
    id: 2,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 1,
    service_id: 2,
  },

  {
    id: 3,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 1,
    service_id: 3,
  },

  {
    id: 4,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 1,
    service_id: 4,
  },

  {
    id: 5,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 1,
    service_id: 5,
  },

  {
    id: 6,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 2,
    service_id: 6,
  },

  {
    id: 7,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 2,
    service_id: 7,
  },

  {
    id: 8,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 1,
    service_id: 8,
  },

  {
    id: 9,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 3,
    service_id: 9,
  },

  {
    id: 10,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 2,
    service_id: 10,
  },

  {
    id: 11,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 4,
    service_id: 11,
  },

  {
    id: 12,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 4,
    service_id: 12,
  },

  {
    id: 13,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 4,
    service_id: 13,
  },

  {
    id: 14,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 3,
    service_id: 14,
  },

  {
    id: 15,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 3,
    service_id: 15,
  },

  {
    id: 16,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 5,
    service_id: 16,
  },

  {
    id: 17,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 5,
    service_id: 17,
  },

  {
    id: 18,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 5,
    service_id: 18,
  },

  {
    id: 19,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 5,
    service_id: 19,
  },

  {
    id: 20,
    cancelled: 'false',
    confirmed: 'true',
    client_id: 5,
    service_id: 20,
  },
];

const seedBooking = () => Booking.bulkCreate(bookingData);

module.exports = seedBooking;
