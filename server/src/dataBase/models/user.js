const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    loginId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      //头像，存图片地址
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = { User };
