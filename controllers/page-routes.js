const router = require('express').Router();
const User = require('../models/user');
const Service = require('../models/service');
const Booking = require('../models/booking');
const Industry = require('../models/industry');
const withAuth = require('../utils/auth');
const { Op, QueryTypes } = require("sequelize");
const sequelize = require('../config/connection');

router.get('/', withAuth, async (req, res) => {

  res.redirect("/dashboard");

});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    //Query all bookings made by the user
    const bookingData = await sequelize.query(`select * from booking b inner join service s on b.service_id = s.id inner join user u on u.id = b.client_id where b.client_id = ${req.session.user_id}`, { type: QueryTypes.SELECT });


    const bookings = []

    for (const booking of bookingData){
      bookings.push({
        user: {
          id: booking.client_id,
          first_name: booking.first_name,
          last_name: booking.last_name,
        },
        cancelled: booking.cancelled,
        confirmed: booking.confirmed,
        title: booking.title,
        start: booking.start,
        end: booking.end,
      })
    }

    //Query all bookings for all bookings for services listed by the user
    const serviceBookingData = await sequelize.query(`select b.id as booking_id, u.id as client_id, u.first_name, u.last_name, b.confirmed, b.cancelled, s.title, s.start, s.end from booking b inner join service s on b.service_id = s.id inner join user u on u.id = b.client_id where s.user_id = ${req.session.user_id}`, {type: QueryTypes.SELECT});

    const bookingsForUserService = [];

    for (const booking of serviceBookingData){
      const bookingStart = new Date(booking.start);
      const bookingEnd = new Date(booking.end);
      
      //Format relevant information for bookings to the user's services
      bookingsForUserService.push({
        user: { 
          id: booking.client_id,
          first_name: booking.first_name,
          last_name: booking.last_name,
        },
        confirmed: booking.confirmed,
        cancelled: booking.cancelled,
        title: booking.title,
        start: booking.start,
        end: booking.end,
        booking_id: booking.booking_id
      })
    }

    const industryData = await Industry.findAll();

    const industries = industryData.map(industry => industry.get({ plain: true }));

    const userServiceData = await Service.findAll({
      attributes: {
        exclude: ['user_id', 'hourly_rate', 'description', 'max bookings'],
      },
      where: {
        user_id: req.session.user_id,
        cancelled: false,
      },
    });
    const userServices = userServiceData.map((service) => service.get({ plain: true }));

    const userData = await User.findAll({
      include: {
        model: Industry,
      },
      attributes: { exclude: ['password'] },
      where: {
        id: req.session.user_id,
      },
    });

    const user = userData.map((user) => user.get({ plain: true }))[0];

    res.render('dashboard', {
      bookings,
      services: userServices,
      bookingsForUserService,
      user,
      industries,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.render('error', {
      status: 500,
      message: 'A internal server error has occured',
      logged_in: req.session.logged_in,
    });
  }
});

router.get('/signin', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('dashboard');
    return;
  }
  res.render('signin');
});

router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('dashboard');
    return;
  }
  res.render('register');
});

router.get('/search', withAuth, async (req, res) => {
  const serviceData = await Service.findAll({
    where: {
      cancelled: { [Op.not]: true },
    },
  });
  const services = serviceData.map((service) => service.get({ plain: true }));

  res.render('search', {
    services,
    logged_in: req.session.logged_in,
  });
});

router.get('/profile', withAuth, async (req, res) => {
  const profileData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
  });

  const profile = profileData.get({ plain: true });

  res.render('profile', {
    profile,
    logged_in: req.session.logged_in,
  });
});

router.get('/edit-profile', withAuth, async (req, res) => {
  const editProfileData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
  });

  const profile = editProfileData.get({ plain: true });

  res.render('profile', { profile, logged_in: req.session.logged_in });
});

router.get('/service/:id', withAuth, async (req, res) => {
  try {
    const ServiceData = await Service.findByPk(req.params.id, {
      include: {
        model: Booking,
        as: 'bookings',
        include: {
          model: User,
          attributes: {
            exclude: ['password'],
          }
        }
      }
    });
    if (!ServiceData) {
      res.render('error', {
        status: 404,
        message: 'A service with this ID cannot be found',
        logged_in: req.session.logged_in,
      });
      return;
    }


    const service = ServiceData.get({ plain: true });
    res.render('service', {
      ...service,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.render('error', {
      status: 500,
      message: 'A internal server error has occured',
      logged_in: req.session.logged_in,
    });
  }
});

router.get('/edit-service', withAuth, async (req, res) => {

  try {
    const ServiceData = await Service.findByPk(req.params.id);
    if (!ServiceData) {
      res.render('error', {
        status: 404,
        message: 'A service with this ID cannot be found',
        logged_in: req.session.logged_in,
      });
      return;
    }
    const service = ServiceData.get({ plain: true });
    res.render('service', {
      service,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.render('error', {
      status: 500,
      message: 'A internal server error has occured',
      logged_in: req.session.logged_in,
    });
  }
});

module.exports = router;
