const router = require('express').Router();
const { Animals } = require('../models');

//Home route
router.get('/', async (req, res) => {
  try {
    const animalsData = await Animals.findAll();
    const animals = animalsData.map((animal) => animal.get({ plain: true }));

    // Render a single page
    res.render('animals', {
      showNavBar: true, // condition to show the nav bar
      animals, // Pass the animals data to the template
      title: 'Animals Page', // Pass the title to the template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//Dogs route
router.get('/dogs', async (req, res) => {
  try {
    const dogData = await Animals.findAll({
      where: {
        species: 'dog',
      },
    });
    const dogs = dogData.map((dog) => dog.get({ plain: true }));

    res.render('dogs', { ...dogs });
  } catch (err) {
    res.status(500).json(err);
  }
});
//Cats route
router.get('/cats', async (req, res) => {
  try {
    const dogData = await Animals.findAll({
      where: {
        species: 'cat',
      },
    });
    const cats = dogData.map((cat) => cat.get({ plain: true }));

    res.render('cats', { ...cats });
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
  res.render('login', { title: 'Login Page' });
  res.render('login', { showNavBar: false }); // condition to not show the nav bar
});
module.exports = router;
