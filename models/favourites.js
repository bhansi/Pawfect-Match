const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favourites extends Model {}

Favourites.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clients',
        key: 'id',
      },
    },
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'animals',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'favourites',
  }
);

module.exports = Favourites;
