const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//class Animals extends Model {}
class Animals extends Model {}

Animals.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      // Add this field
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'animals',
  }
);

module.exports = Animals;
