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

    res.render('animals', {
      showNavBar: true, // condition to show the nav bar
      animals, // Pass the animals data to the template
      title: 'Animals Page', // Pass the title to the template
      logged_in: req.session.logged_in, // Pass the logged-in status
      userName: req.session.user_name, // Pass the logged-in user's name
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
        //'$adoption.adoption_status$': 'pending',
      },
    });

    if (!dogData.length) {
      res.render('dogs', {
        message: 'There are no cats available for adoption.',
        logged_in: req.session.logged_in,
        userName: req.session.logged_in ? req.session.user_name : null,
      });
      return;
    }

    const dogs = dogData.map((dog) => dog.get({ plain: true }));

    res.render('dogs', {
      dogs: dogs,
      logged_in: req.session.logged_in,
      is_employee: req.session.is_employee,
      userName: req.session.logged_in ? req.session.user_name : null,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//cats route
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
        // '$adoption.adoption_status$': 'pending',(for now check it later if it works)
      },
    });

    if (!catData.length) {
      res.render('cats', {
        message: 'There are no cats available for adoption.',
        logged_in: req.session.logged_in,
        userName: req.session.logged_in ? req.session.user_name : null,
      });
      return;
    }

    const cats = catData.map((cat) => cat.get({ plain: true }));

    res.render('cats', {
      cats: cats,
      logged_in: req.session.logged_in,
      is_employee: req.session.is_employee,
      userName: req.session.logged_in ? req.session.user_name : null,
    });
  } catch (err) {
    res.status(500).json(err);
  }
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
