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
        message: 'No active applications to display.'
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

module.exports = router;