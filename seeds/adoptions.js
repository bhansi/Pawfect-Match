const { Adoptions } = require('../models');

const adoptionData = [
  {
    animal_id: 1,
    client_id: 1,
    adoption_status: 'pending',
  },
  {
    animal_id: 2,
    client_id: 2,
    adoption_status: 'approved',
    adoption_date: new Date(),
    approved_by: 1,
  },
];

const seedAdoptions = () => Adoptions.bulkCreate(adoptionData);

module.exports = seedAdoptions;
