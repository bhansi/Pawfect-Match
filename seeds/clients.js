const { Clients } = require('../models');

const clientsData = [
  {
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.smith@example.com',
    address: '1234 Main St',
    password: '12345678',
  },
  {
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jane.doe@example.com',
    address: '456 Elm St',
    password: '123456789',
  },
  {
    first_name: 'David',
    last_name: 'Blane',
    email: 'david.blane@example.com',
    address: '789 Somewhere St',
    password: '123456789',
  },
];

const seedClients = () =>
  Clients.bulkCreate(clientsData, { individualHooks: true });

module.exports = seedClients;
