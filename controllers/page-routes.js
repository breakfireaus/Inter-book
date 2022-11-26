const router = require('express').Router();
const User = require('../models/user');
const Service = require('../models/service');
const withAuth = require('../utils/auth');
const { parseWithoutProcessing } = require('handlebars');

router.get('/', withAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
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

router.get('/search', (req, res) => {});

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

router.get('/service/:id?mode=edit|create', withAuth, async (req, res) => {
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
