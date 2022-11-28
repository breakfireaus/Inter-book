const router = require("express").Router();
const { Booking, User, Service } = require("../../models");
const withAuth = require("../../utils/auth");


// CREATE a booking 

router.post('/create', withAuth, async (req,res) => {
    try {
        
        const existingBooking = Booking.findAll({where: { 
                service_id: req.body.service_id ,
                client_id: req.session.user_id,
            }
        });

        if (existingBooking) {
            res.status(400).json({
                message: "A booking with this ID already exists",
            });
            return;
        }
        const bookingCard = await Booking.create({

            id: req.body.id,
            client_id: req.session.user_id,
            service_id: req.body.service_id,
            cancelled: req.body.cancelled,
            confirmed: req.body.confirmed

            });
        }
        
        res.status(200).json({bookingCard});
        
    } catch (err) {
        res.status(400).json({message: 'An internal server error occurred 😿'});
    }
});


// CANCEL a booking 

router.update('/update/:id', withAuth, async (req, res) => {
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