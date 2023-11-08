const router = require('express').Router();
const { Employees, Clients, Adoptions, Animals } = require('../../models');
const withEmployeeAuth = require('../../utils/auth')
const { sql } = require('sequelize/core')

router.get('/applications', withEmployeeAuth, async (req, res) => {
  try {
    const applicationData = await Adoptions.findAll({
      include: [
        {
          model: Animals,
          required: true
        },
        {
          model: Clients,
          required: true
        }
      ],
      where: {
        adoption_status: [ 'pending', 'requested' ]
      },
      order: [
        [ 'request_date', 'ASC' ],
        [ 'animal_id', 'ASC' ]
      ]
    });

    if(!applicationData) {
      res.json({
        message: 'There are no active applications to display.'
      });
      return;
    }

    const applications = applicationData.map((application) => application.get({ plain: true }));

    res.render('applications', {
      ...applications
    });
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/applications/:id', withEmployeeAuth, async (req, res) => {
  try {
    const primaryApplication = await Adoptions.findByPk(req.body.id);

    primaryApplication.adoption_status = req.body.adoption_status;
    await primaryApplication.save();

    if(primaryApplication.adoption_status === 'approved') {
      const secondaryApplications = await Adoptions.findAll({
        where: {
          animal_id: primaryApplication.animal_id,
          adoption_status: 'requested'
        }
      });

      await secondaryApplications.forEach(async (application) => {
        application.adoption_status = 'adopted';
        await application.save();
      });
    }
    else {
      const secondaryApplication = await Adoptions.findOne({
        where: {
          animal_id: primaryApplication.animal_id,
          adoption_status: 'requested',
        },
        having: sql`MIN(request_date)`,
        order: [
          [ 'request_date', 'ASC' ]
        ]
      });

      secondaryApplication.adoption_status = 'pending';
      await secondaryApplication.save();
    }

    res.json({
      message: 'Successfully updated adoption request.'
    });
  } catch(err) {
    res.status(400).json(err);
  }
});

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
