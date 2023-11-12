const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Employees, Clients } = require('../../models');

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
        message: 'You are now logged in!',
      });
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(400).json(err);
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
