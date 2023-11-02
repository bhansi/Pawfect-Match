const router = require('express').Router();
const { Animals } = require('../models');

router.get('/', async (req, res) => {
  try {
    const animalsData = await Animals.findAll();
    const animals = animalsData.map((animal) => animal.get({ plain: true }));

    res.render('homepage', { ...animals });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
module.exports = router;
