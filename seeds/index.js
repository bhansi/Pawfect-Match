const seedAdoptions = require('./adoptions');
const seedAnimals = require('./animals');
const seedClients = require('./clients');
const seedEmployees = require('./employees');
const seedFavourites = require('./favourites');

const sequelize = require('../config/connection');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedAnimals();
    console.log('\n----- ANIMALS SEEDED -----\n');

    await seedClients();
    console.log('\n----- CLIENTS SEEDED -----\n');

    await seedEmployees();
    console.log('\n----- EMPLOYEES SEEDED -----\n');

    await seedAdoptions();
    console.log('\n----- ADOPTIONS SEEDED -----\n');

    await seedFavourites();
    console.log('\n----- FAVOURITES SEEDED -----\n');

    console.log('All data seeded successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
};

seedAll();
