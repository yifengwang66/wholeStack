const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("daily_fresh", "root", "123123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
