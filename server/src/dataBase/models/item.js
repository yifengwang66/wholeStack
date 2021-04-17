const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Item = sequelize.define(
  "Item",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subTitle: {
      //商品副标题
      type: DataTypes.STRING,
      allowNull: true,
    },
    unit: {
      //商品计量单位
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    disPrice: {
      //折扣价
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sort: {
      //商品分类
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
      //商品标签
      type: DataTypes.STRING,
      allowNull: true,
    },
    disc: {
      //商品描述
      type: DataTypes.STRING,
      allowNull: true,
    },
    storage: {
      //商品库存
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    onSale: {
      //商品状态，是否上架
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = { Item };
