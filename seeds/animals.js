const { Animals } = require('../models');

const animalData = [
  {
    name: 'Charlie',
    age: 2,
    description: 'A playful young pup with a lot of energy.',
    photo: 'charlie.jpg',
    species: 'Dog',
  },
  {
    name: 'Whiskers',
    age: 2,
    description: 'A curious cat that loves to explore.',
    photo: 'whiskers.jpg',
    species: 'Cat',
  },
  {
    name: 'Tom',
    age: 1,
    description: 'A cute cat that like to play.',
    photo: 'tom.jpg',
    species: 'Cat',
  },
  {
    name: 'Max',
    age: 3,
    description: 'A friendly young pup.',
    photo: 'max.jpg',
    species: 'Dog',
  },
];

const seedAnimals = () => Animals.bulkCreate(animalData);

module.exports = seedAnimals;
