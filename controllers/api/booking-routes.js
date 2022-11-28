const router = require("express").Router();
const { Booking, User, Service } = require("../../models");
const withAuth = require("../../utils/auth");


// CREATE a booking 

router.post('/create', withAuth, async (req,res) => {
    try {
        
        const existingBooking = await Booking.findAll({where: { 
                service_id: req.body.service_id ,
                client_id: req.session.user_id,
            }
        });

        if (existingBooking.length > 0) {
            res.status(400).json({
                message: "You have already booked this service",
            });
            return;
        }
        const bookingCard = await Booking.create({
            client_id: req.session.user_id,
            service_id: req.body.service_id,
            });
      

        
        res.status(200).json({});
        
    } catch (err) {
        res.status(400).json({message: 'An internal server error occurred 😿'});
    }
});


// CANCEL a booking 

router.delete('/update/:id', withAuth, async (req, res) => {
    try {

        const bookingToUpdate = await Booking.findByPk(req.params.id);

        if (!bookingToUpdate) {
            res.status(404).json({message: 'No Booking with that id exists 😔'});
        }

        const bookingData = await Booking.update({ cancelled: true},
            {where: {
                id: req.params.id,
            },
        });
    
        res.status(200).json(bookingData);

    } catch (err) {
        res.status(500).json({message: 'An internal server error occurred 😿'});
    }
});

module.exports = router;