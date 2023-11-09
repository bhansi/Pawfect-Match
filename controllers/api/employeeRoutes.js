const router = require('express').Router();
const { Clients, Adoptions, Animals } = require('../../models')
const withEmployeeAuth = require('../../utils/auth');

// Retrieve all active applications
router.get('/applications', /* withEmployeeAuth, */ async (req, res) => {
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

// Update specific application
router.put('/applications/:id', /* withEmployeeAuth, */ async (req, res) => {
  try {
    const primaryApplication = await Adoptions.findByPk(req.params.id);

    primaryApplication.adoption_status = req.body.adoption_status;
    await primaryApplication.save();

    if(primaryApplication.adoption_status === 'approved') {
      const secondaryApplications = await Adoptions.findAll({
        where: {
          animal_id: primaryApplication.animal_id,
          adoption_status: 'requested'
        }
      });

      secondaryApplications.forEach(async (application) => {
        application.adoption_status = 'adopted';
        await application.save();
      });
    }
    else {
      const secondaryApplication = await Adoptions.findOne({
        where: {
          animal_id: primaryApplication.animal_id,
          adoption_status: 'requested',
        }
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

// Update specific animal
router.put('/animals/:id', /* withEmployeeAuth, */ async (req, res) => {
  try {
    const animalData = await Animals.findByPk(req.params.id);

    animalData.name = req.body.name;
    animalData.age = req.body.age;
    animalData.description = req.body.description;
    animalData.species = req.body.species;

    await animalData.save();

    res.json({
      message: 'Successfully updated animal data.'
    });
  } catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;