const { Favourites } = require('../models');

const favouriteData = [
  {
    client_id: 1,
    animal_id: 1,
  },
  {
    client_id: 1,
    animal_id: 2,
  },
  {
    client_id: 2,
    animal_id: 1,
  },
];

const seedFavourites = () => Favourites.bulkCreate(favouriteData);

module.exports = seedFavourites;
