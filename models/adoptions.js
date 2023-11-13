const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Adoptions extends Model {}

Adoptions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    animal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'animals',
        key: 'id',
      },
    },
    client_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'clients',
        key: 'id',
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    request_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    adoption_status: {
      type: DataTypes.STRING, // pending, requested, approved, denied, adopted, withdrawn
      allowNull: false,
    },
    adoption_date: {
      type: DataTypes.DATE,
      allowNull: true, // Assuming adoption_date can be null until the adoption is finalized
    },
    approved_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employees',
        key: 'id',
      },
      allowNull: true, // Assuming approved_by can be null until the adoption is approved
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'adoptions',
  }
);

module.exports = Adoptions;
