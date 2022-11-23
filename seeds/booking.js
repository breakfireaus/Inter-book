const { Booking } = require('../models');

const bookingData = [
    {
        id: 1,
        cancelled: 'false',
        confirmed: 'true',
        client_id: 2,
        service_id: 1,
    
    },
]

const seedBooking = () => Booking.bulkCreate(bookingData);

module.exports = seedBooking;