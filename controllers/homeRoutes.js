const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Animals, Adoptions, Clients } = require('../models');

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
      where: {
        species: 'Dog',
      },
      group: ['Animals.id'], // Group by Animal ID
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
    console.log('Dogs data:', dogs);
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
          attributes: ['adoption_status'],
          required: false,
        },
      ],
      where: {
        species: 'cat',
        // '$adoption.adoption_status$': 'pending',
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

// GET route to display the adoption form
router.get('/adoption-form', async (req, res) => {
  try {
    const animalId = req.query.animal_id;
    res.render('adoption-form', {
      animalId: animalId,
      logged_in: req.session.logged_in,
      userName: req.session.logged_in ? req.session.user_name : null,
    });
  } catch (err) {
    console.error('Error loading adoption form:', err);
    res.status(500).send('Error loading the adoption form');
  }
});

//Success page
router.get('/success-page', (req, res) => {
  res.render('success-page', {
    layout: 'main',
    userName: req.session.userName,
    logged_in: req.session.logged_in,
    userName: req.session.logged_in ? req.session.user_name : null,
  });
});

// Retrieve all active applications
router.get(
  '/applications',
  /* withEmployeeAuth, */ async (req, res) => {
    try {
      const applicationData = await Adoptions.findAll({
        include: [
          {
            model: Animals,
            required: true,
          },
          {
            model: Clients,
            required: true,
          },
        ],
        where: {
          adoption_status: ['pending', 'requested', 'approved'],
        },
        order: [
          ['request_date', 'ASC'],
          ['animal_id', 'ASC'],
        ],
      });

      if (!applicationData) {
        console.log(applicationData);
        res.json({
          message: 'There are no active applications to display.',
        });
        return;
      }

      const applications = applicationData.map((application) =>
        application.get({ plain: true })
      );
      console.log(applications);
      res.render('applications', {
        applications: applications,
        is_employee: true,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
//Application details route
router.get('/application/:id', async (req, res) => {
  try {
    const applicationId = req.params.id;
    const applicationData = await Adoptions.findOne({
      where: { id: applicationId },
      include: [{ model: Animals }, { model: Clients }],
    });
    console.log(
      'Fetched application data:',
      applicationData.get({ plain: true })
    );
    if (applicationData) {
      res.render('applicationDetails', {
        application: applicationData.get({ plain: true }),
        layout: 'main',
      });
    } else {
      res.status(404).send('Application not found');
    }
  } catch (error) {
    console.error('Error fetching application details:', error);
    res.status(500).send('Internal Server Error');
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

// GET route for displaying the signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/'); // Redirect to the main page if already logged in
  } else {
    res.render('signup'); // Render the signup page
  }
});

//Signup route
router.post('/signup', async (req, res) => {
  try {
    const { first_name, address, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Clients.create({
      first_name,
      address,
      email,
      password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      req.session.user_name = newUser.first_name;
      res.redirect('/');
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
