// models/index.js

const Animals = require('./animals');
const Adoptions = require('./adoptions');
const Clients = require('./clients');
const Favourites = require('./favourites');
const Employees = require('./employees');

// Setting up associations

Animals.hasOne(Adoptions, {
  foreignKey: 'animal_id',
  onDelete: 'CASCADE',
});
Adoptions.belongsTo(Animals, {
  foreignKey: 'animal_id',
});

Clients.hasMany(Adoptions, {
  foreignKey: 'client_id',
  onDelete: 'CASCADE',
});
Adoptions.belongsTo(Clients, {
  foreignKey: 'client_id',
});

Clients.hasMany(Favourites, {
  foreignKey: 'client_id',
  onDelete: 'CASCADE',
});
Favourites.belongsTo(Clients, {
  foreignKey: 'client_id',
});

Animals.hasMany(Favourites, {
  foreignKey: 'animal_id',
  onDelete: 'CASCADE',
});
Favourites.belongsTo(Animals, {
  foreignKey: 'animal_id',
});

module.exports = {
  Animals,
  Adoptions,
  Clients,
  Favourites,
  Employees,
};
