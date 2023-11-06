const { Employees } = require('../models');

const employeeData = [
  {
    first_name: 'Smith',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    address: '123 Main St',
    password: 'password123',
  },
  {
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    address: '456 Elm St',
    password: 'password456',
  },
];

const seedEmployees = () =>
  Employees.bulkCreate(employeeData, { individualHooks: true });

module.exports = seedEmployees;
