const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const sequelize = require("../../config/connection");
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
        res.status(500).json({message: 'An internal server error occurred 😿'});
    }
});

router.patch('/confirm/', withAuth, async(req,res) => {
    try {
        const booking = await sequelize.query(`select b.id as booking_id, s.user_id as service_owner_id, u.first_name, u.last_name, b.confirmed, b.cancelled, s.title, s.start, s.end from booking b inner join service s on b.service_id = s.id inner join user u on u.id = b.client_id where b.id = ${req.body.booking_id}`, {type: QueryTypes.SELECT});

        if(booking[0].service_owner_id != req.session.user_id){
            res.status(401).json({
                message: "You are not able to confirm this booking as you do not own the service"
            });
            
        } else if (booking[0].confirmed) {
            res.status(400).json({
                message: "Booking is already confirmed",
            });
        } else if (booking[0].cancelled) {
            res.status(400).json({
                message: "You are unable to confirm a cancelled booking",
            });
        } else {
            await Booking.update({
                confirmed: true,
            }, {
                where: {
                    id: req.body.booking_id,
                }
            })

            res.status(200).json({
                message: "Booking confirmed"
            })
        }

    } catch (err) {
        res.status(500).json({
            message: "An internal server error occurred",
        });
    }
})


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