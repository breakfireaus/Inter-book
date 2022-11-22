const router = require("express").Router();
const { Booking, User, Service } = require("../../models");

// GET all bookings 

router.get ('/', withAuth, async (req,res) => {
try {
    const bookingData = await Booking.findAll({
        include: [{ model: User, Service }],
    });
    res.status(200).json(bookingData);
} catch (err) {
    res.status(500).json({message: 'An internal server error occurred 😿'});
});

// GET a single booking

router.get ('/:id', withAuth, async (req,res) => {
    try {
        const bookingData = await Booking.findByPk(req.params.id, {
            include: [{ model: User, Service }],
        });

    if(!bookingData) {
        res.status(404).json({ message: 'No Booking with that id exists 😔'});
        return;
    }
        
    res.status(200).json(bookingData);
    } catch (err) {
        res.status(500).json({message: 'An internal server error occurred 😿'});
    }
    });

// CREATE a booking 

router.post('/', withAuth, async (req,res) => {
    try {
        const bookingCard = await Booking.create({
            client_id: req.body.client_id,
            service_id: req.body.service_id,
            // Maybe add confirmation status?

            });
        res.status(200).json(bookingCard);
    } catch (err) {
        res.status(400).json({message: 'An internal server error occurred 😿'});
    }
});


// CANCEL a booking 

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const bookingData = await Booking.destroy({
            where: {
                id: req.params.id,
            },
        });

        if(!bookingData) {
            res.status(404).json({message: 'No Booking with that id exists 😔'});
        }

        res.status(200).json(bookingData);
    } catch (err) {
        res.status(500).json({message: 'An internal server error occurred 😿'})
    }
});

module.exports = router;