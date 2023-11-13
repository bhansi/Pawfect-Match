const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Employees, Clients, Adoptions } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the request body to the console to see what was sent
    const userData = await (req.body.is_employee ? Employees : Clients).findOne(
      {
        where: { email: req.body.email },
      }
    );

    if (!userData) {
      console.log('No user found with that email');
      res.status(400).json({
        message: 'Incorrect email or password, please try again.',
      });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    console.log('Password validation result:', validPassword);
    if (!validPassword) {
      res.status(400).json({
        message: 'Incorrect email or password, please try again.',
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.is_employee = req.body.is_employee;
      req.session.user_name = userData.first_name;

      res.json({
        user: userData,
        userName: userData.first_name,
        isEmployee: req.session.is_employee,
        message: 'You are now logged in!',
      });
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(400).json(err);
  }
});

// POST route for adoption form submission
router.post('/adoption-form', async (req, res) => {
  try {
    // Extract the form data from the request body
    const { animalId, requestDate, adoptionStatus, adoptionReason } = req.body;
    const clientId = req.session.user_id;

    // Create a new adoption record using the Adoptions model
    const newAdoption = await Adoptions.create({
      animal_id: animalId,
      client_id: clientId,
      request_date: requestDate || new Date(),
      adoption_status: adoptionStatus || 'pending',
      adoption_reason: adoptionReason,
    });

    // Redirect to a success page or handle the response as needed
    res.redirect('/success-page');
  } catch (error) {
    console.error('Error in submitting adoption form:', error);
    res.status(500).send('Error processing your request');
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
