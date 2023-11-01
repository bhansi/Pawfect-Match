const router = require('express').Router();
const { Animals } = require('../models');

router.get('/', async (req, res) => {
    try {
        const animalsData = await Animals.findAll();
        const animals = animalsData.map((animal) => animal.get({ plain: true }));

        res.render('homepage', { animals });
    }
    catch(err) {
        res.status(500).json(err);
    }
});