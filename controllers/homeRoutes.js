const router = require('express').Router();
const { Animals, Adoptions } = require('../models');

router.get('/', async (req, res) => {
  try {
    const animalsData = await Animals.findAll({
      include: [
        {
          model: Adoptions,
          required: false
        }
      ],
      where: {
        adoption_status: 'pending'
      }
    });
    const animals = animalsData.map((animal) => animal.get({ plain: true }));

    res.render('homepage', {
      ...animals,
      logged_in: req.session.logged_in,
      is_employee: req.session.is_employee
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dogs', async (req, res) => {
  try {
    const dogData = await Animals.findAll({
      include: [
        {
          model: Adoptions,
          required: false
        }
      ],
      where: {
        species: 'dog',
        adoption_status: 'pending'
      },
    });
    const dogs = dogData.map((dog) => dog.get({ plain: true }));

    res.render('homepage', {
      ...dogs,
      logged_in: req.session.logged_in,
      is_employee: req.session.is_employee
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/cats', async (req, res) => {
  try {
    const catData = await Animals.findAll({
      include: [
        {
          model: Adoptions,
          required: false
        }
      ],
      where: {
        species: 'cat',
        adoption_status: 'pending'
      },
    });
    const cats = catData.map((cat) => cat.get({ plain: true }));

    res.render('homepage', {
      ...cats,
      logged_in: req.session.logged_in,
      is_employee: req.session.is_employee
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
