const router = require('express').Router();
const { Clients, Adoptions, Animals } = require('../../models');
const withEmployeeAuth = require('../../utils/auth');

// Update specific application
router.put(
  '/application/:id',
  /* withEmployeeAuth, */ async (req, res) => {
    try {
      const primaryApplication = await Adoptions.findByPk(req.params.id);

      primaryApplication.adoption_status = req.body.adoption_status;
      await primaryApplication.save();

      if (primaryApplication.adoption_status === 'approved') {
        primaryApplication.adoption_date = new Date();
        await primaryApplication.save();

        const secondaryApplications = await Adoptions.findAll({
          where: {
            animal_id: primaryApplication.animal_id,
            adoption_status: 'requested',
          },
        });

        secondaryApplications.forEach(async (application) => {
          application.adoption_status = 'adopted';
          await application.save();
        });
      } else {
        const secondaryApplication = await Adoptions.findOne({
          where: {
            animal_id: primaryApplication.animal_id,
            adoption_status: 'requested',
          },
        });

        secondaryApplication.adoption_status = 'pending';
        await secondaryApplication.save();
      }

      res.status(200).json({
        message: 'Successfully updated adoption request.',
      });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// Add an animal
router.post(
  '/animal',
  /* withEmployeeAuth, */ async (req, res) => {
    try {
      const newAnimal = await Animals.create({
        ...req.body,
      });

      res.json({
        message: 'Successfully added new animal to database.',
      });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// Delete a specific animal
router.delete(
  '/application/:id',
  /* withEmployeeAuth, */ async (req, res) => {
    try {
      const animalData = await Adoptions.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.json({
        message: animalData
          ? 'Successfully deleted animal.'
          : 'No animal found with this id.',
      });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
