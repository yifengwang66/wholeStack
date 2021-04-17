const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const baseAuthority = {
  read: 0b001,
  write: 0b010,
  create: 0b100,
};

const Admin = sequelize.define(
  "Admin",
  {
    loginId: {
      //唯一标识，不由用户自己设置，用户注册时由后端生成唯一的id
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
    authority: {
      //管理员权限, 设置初始权限为只读
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: baseAuthority.read,
    },
    isRoot: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    paranoid: true, //当删除数据时不会真实删除，而是添加一列删除时间
  }
);

module.exports = { baseAuthority, Admin };
