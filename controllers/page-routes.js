const router = require('express').Router();
const User = require('../models/user');
const Service = require('../models/service');
const Booking = require('../models/booking');
const Industry = require('../models/industry');
const withAuth = require('../utils/auth');
const { Op } = require("sequelize")

router.get('/', withAuth, async (req, res) => {
  try {
    const bookingData = await Booking.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const bookings = bookingData.map((booking) => booking.get({ plain: true }));

    const serviceData = await Service.findAll({
      attributes: {
        exclude: ['user_id', 'hourly_rate', 'description', 'max bookings'],
      },
      where: {
        user_id: req.session.user_id,
        cancelled: false,
      },
    });
    const services = serviceData.map((service) => service.get({ plain: true }));

    const userData = await User.findAll({
      include: {
        model: Industry,
      },
      attributes: { exclude: ['password'] },
      where: {
        user_id: req.session.user_id,
      },
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      bookings,
      services,
      user,
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

router.get('/search', async (req, res) => {
  const serviceData = await Service.findAll({
    
    where: {
      user_id: req.session.user_id,
      cancelled: {[Op.not]: true}, 
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
