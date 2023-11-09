const router = require('express').Router();
const { Employees, Clients, Adoptions, Animals } = require('../../models');
const withEmployeeAuth = require('../../utils/auth')

router.post('/login', async (req, res) => {
  try {
    const userData = await (
        req.body.is_employee ?
        Employees            :
        Clients              ).findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({
        message: 'Incorrect email or password, please try again.'
      });
      return;
    }

    const validPassword = await employeeData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: 'Incorrect email or password, please try again.'
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.is_employee = req.body.is_employee;

      res.json({
        user: userData,
        message: 'You are now logged in!'
      });
    });

  } catch (err) {
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
