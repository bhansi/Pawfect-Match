const { Animals } = require('../models');

const animalData = [
  // Dogs
  {
    name: 'Charlie',
    age: 2,
    description: 'A playful young pup with a lot of energy.',
    photo: 'Labrador Retriever.png',
    species: 'Dog',
    breed: 'Labrador Retriever',
  },
  {
    name: 'Max',
    age: 3,
    description: 'A friendly young pup.',
    photo: 'Golden Retriever.png',
    species: 'Dog',
    breed: 'Golden Retriever',
  },
  {
    name: 'Buddy',
    age: 2,
    description: 'Loyal and loving, great with families.',
    photo: 'Beagle.png',
    species: 'Dog',
    breed: 'Beagle',
  },

  // Cats
  {
    name: 'Whiskers',
    age: 2,
    description: 'A curious cat that loves to explore.',
    photo: 'Siamese.png',
    species: 'Cat',
    breed: 'Siamese',
  },
  {
    name: 'Tom',
    age: 1,
    description: 'A cute cat that likes to play.',
    photo: 'Persian.png',
    species: 'Cat',
    breed: 'Persian',
  },
  {
    name: 'Luna',
    age: 2,
    description: 'Shy at first, but very affectionate once comfortable.',
    photo: 'Maine Coon.png',
    species: 'Cat',
    breed: 'Maine Coon',
  },
];

const seedAnimals = () => Animals.bulkCreate(animalData);

module.exports = seedAnimals;
