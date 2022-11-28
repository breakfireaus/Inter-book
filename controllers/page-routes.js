const router = require('express').Router();
const User = require('../models/user');
const Service = require('../models/service');
const Booking = require('../models/booking');
const Industry = require('../models/industry');
const withAuth = require('../utils/auth');
const { Op } = require("sequelize")

router.get('/', withAuth, async (req, res) => {

  res.redirect("/dashboard");

});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const bookingData = await Booking.findAll({
      where: {
        client_id: req.session.user_id,
      },
      include: [{
        model: Service
      }]
    });

    const bookings = bookingData.map((booking) => booking.get({ plain: true }));

    const industryData = await Industry.findAll();

    const industries = industryData.map(industry => industry.get({ plain: true }));

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
        id: req.session.user_id,
      },
    });

    const user = userData.map((user) => user.get({ plain: true }))[0];

    res.render('dashboard', {
      bookings,
      services,
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
