const router = require('express').Router();
const { Adoptions } = require('../../models');
const withAuth = require('../../utils/auth');

// Retrieve all active applications for a logged in client
router.get('/applications', /* withAuth, */ async (req, res) => {
  try {
    const applicationData = await Adoptions.findAll({
      where: {
        client_id: req.session.user_id,
        adoption_status: [ 'pending', 'requested' ]
      }
    });

    if(!applicationData.length) {
      res.json({
        message: 'No active adoption applications to display.'
      });
      return;
    }

    const applications = applicationData.map((application) => application.get({ plain: true }));

    res.render('applications', {
      ...applications,
      is_employee: false,
    });
  } catch(err) {
    res.status(400).json(err);
  }
});

// Create new adoption application
router.post('/application', /* withAuth, */ async (req, res) => {
  try {
    const applicationData = await Adoptions.findAll({
      where: {
        animal_id: req.body.animal_id,
        adoption_status: [ 'pending', 'requested' ]
      }
    });

    if(!applicationData.length) {
      const newApplication = await Adoptions.create({
        ...req.body,
        client_id: req.session.user_id,
        request_date: new Date(),
        adoption_status: 'pending'
      });

      res.status(200).json({
        message: 'Successfully submitted adoption application.'
      });
    }
    else {
      for(let i = 0; i < applicationData.length; i++) {
        if(applicationData[i].client_id == req.session.user_id) {
          res.json({
            message: 'You already have an active adoption application for this animal.'
          });
          return;
        }
      }

      const newApplication = await Adoptions.create({
        ...req.body,
        client_id: req.session.user_id,
        request_date: new Date(),
        adoption_status: 'requested'
      });

      res.status(200).json({
        message: 'Successfully submitted adoption application.'
      });
    }
  } catch(err) {
    res.status(400).json(err);
  }
});

// Withdraw adoption application
router.put('/applications/:id', /* withAuth, */ async (req, res) => {
  try {
    const applicationData = await Adoptions.findOne({
      where: {
        id: req.params.id,
        adoption_status: [ 'pending', 'requested' ]
      }
    });

    if(!applicationData) {
      res.json({
        message: 'Could not find adoption application.'
      });
    }
    else {
      if(applicationData.adoption_status == 'pending') {
        const nextApplication = await Adoptions.findOne({
          where: {
            animal_id: applicationData.animal_id,
            adoption_status: 'requested'
          }
        });

        if(nextApplication) {
          nextApplication.adoption_status = 'pending';
          nextApplication.save();
        }

        applicationData.adoption_status = 'withdrawn';
        await applicationData.save();
        res.json({
          message: 'Successfully withdrew adoption application.'
        });
      }
    }
  } catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;