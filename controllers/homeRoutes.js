const router = require('express').Router();
const { Animals, Adoptions } = require('../models');

//Home route
router.get('/', async (req, res) => {
  try {
    const animalsData = await Animals.findAll({
      include: [
        {
          model: Adoptions,
          required: false,
        },
      ],
      where: {
        '$adoption.adoption_status$': 'pending',
      },
    });

    if (!animalsData) {
      res.json({
        message: 'There are no animals available for adoption.',
      });
      return;
    }

    const animals = animalsData.map((animal) => animal.get({ plain: true }));

    res.render('homepage', {
      ...animals,
      logged_in: req.session.logged_in,
      is_employee: req.session.is_employee,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//Dogs route
router.get('/dogs', async (req, res) => {
  try {
    const dogData = await Animals.findAll({
      include: [
        {
          model: Adoptions,
          required: false,
        },
      ],
      where: {
        species: 'dog',
        '$adoption.adoption_status$': 'pending',
      },
    });

    if (!dogData) {
      res.json({
        message: 'There are no dogs available for adoption',
      });
      return;
    }

    const dogs = dogData.map((dog) => dog.get({ plain: true }));

    res.render('homepage', {
      ...dogs,
      logged_in: req.session.logged_in,
      is_employee: req.session.is_employee,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//Cats route
router.get('/cats', async (req, res) => {
  try {
    const catData = await Animals.findAll({
      include: [
        {
          model: Adoptions,
          required: false,
        },
      ],
      where: {
        species: 'cat',
        '$adoption.adoption_status$': 'pending',
      },
    });

    if (!catData) {
      res.json({
        message: 'There are no cats available for adoption',
      });
      return;
    }

    const cats = catData.map((cat) => cat.get({ plain: true }));

    res.render('homepage', {
      ...cats,
      logged_in: req.session.logged_in,
      is_employee: req.session.is_employee,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Adoption form route
router.get('/adoptions', (req, res) => {
  res.render('adoptions', { title: 'Adoptions Page' });
  res.render('adoptions', { showNavBar: false });
});

//Login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'Login Page', //conditional rendering
      showNavBar: false, //conditional rendering
    });
  }
});

module.exports = router;
