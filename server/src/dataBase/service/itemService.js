const { Item } = require("../models/item");
const validate = require("validate.js");

async function isExist(id) {
  const item = await Item.findByPk(id);
  return item || false;
}

exports.addItem = async function (itemObj) {
  const rule = {
    name: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    subTitle: {
      type: "string",
    },
    unit: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    price: {
      presence: {
        allowEmpty: false,
      },
      type: "number",
    },
    disPrice: {
      presence: {
        allowEmpty: false,
      },
      type: "number",
    },
    sort: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    tag: {
      type: "string",
    },
    storage: {
      presence: {
        allowEmpty: false,
      },
      type: "number",
    },
    onSale: {
      presence: {
        allowEmpty: false,
      },
      type: "boolean",
    },
    img: {
      type: "string",
    },
  };
  const result = validate.validate(itemObj, rule);
  if (result) {
    throw result;
  }
  const item = await Item.create(itemObj);
  return item;
};

exports.deleteItem = async function (id) {
  if (!(await isExist(id))) return null;
  await Item.destroy({
    where: {
      id,
    },
  });
  return true;
};

exports.editItem = async function (id, itemObj) {
  if (!(await isExist(id))) return false;
  await Item.update(itemObj, {
    where: {
      id,
    },
  });
  return true;
};

exports.findItem = async function (options) {
  const id = options.id;
  if (id) {
    // 如果查找条件中有id，则只根据id查找
    return await Item.findOne({
      where: {
        id,
      },
    });
  }

  const result = await Item.findAll({
    where: options,
    limit: 15,
  });
  return result;
};
