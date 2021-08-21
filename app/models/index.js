const dbConfig = require("../config/db.config.js");

// create db if it doesn't already exist
const connection = await mysql.createConnection({ dbConfig.HOST, 3306, dbConfig.USER, dbConfig.PASSWORD });
await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.DB}\`;`);

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;
