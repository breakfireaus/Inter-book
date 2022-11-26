const router = require('express').Router();
const User = require('../models/user');
const withAuth = require('../utils/auth');

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

router.get('/search', (req, res) => {
  
});

router.get('/profile', withAuth, async(req, res) => {
 
  const profileData = await User.findByPk(req.session.user_id, { attributes: { exclude: ['password'] } });

  const profile = profileData.get({plain: true});
  
  res.render("profile", { profile });
});

module.exports = router;
