//Connection to the database
const Sequelize = require('sequelize');
require('dotenv').config();

//This let statement is used to connect to the database
let sequelize;

//if statement to check process.env.JAWSDB_URL
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}
//this module.exports is used to export the sequelize variable
module.exports = sequelize;
