const { Admin } = require("../models/admin");
const { Op } = require("sequelize");
const validate = require("validate.js");

async function isExist({ loginId = "", name = "" }) {
  if (!loginId && !name) {
    throw "get admin by loginId or name, but get empty both.";
  }
  const admin = await Admin.findOne({
    where: {
      [Op.or]: [{ loginId }, { name }],
    },
  });
  return admin || false;
}

exports.addAdmin = async function (admin) {
  //添加管理员
  const rule = {
    name: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
      length: {
        minimum: 1,
        maximum: 20,
      },
    },
    password: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
  };
  const result = validate.validate(admin, rule);
  if (result) {
    throw result;
  }
  const isNamed = await Admin.findOne({
    where: {
      name: admin.name,
    },
  });
  if (isNamed) throw `the name "${admin.name}" had been registered`;
  const newAdmin = await Admin.create(admin);
  return newAdmin;
};

exports.deleteAdmin = async function (loginId) {
  if (!(await isExist({ loginId }))) return false;
  await Admin.destroy({
    where: {
      loginId,
    },
  });
  return true;
};

exports.editAdmin = async function (loginId, adminObj) {
  if (!loginId) throw "loginId is necessary";
  if (!(await isExist({ loginId }))) {
    throw "admin doesn't exist";
  }
  if (
    (adminObj.name && typeof adminObj.name !== "string") ||
    adminObj.name === ""
  )
    throw "invalid name.";
  if (adminObj > 7) throw "invalid authority";
  await Admin.update(adminObj, {
    where: {
      loginId,
    },
  });
  return true;
};

exports.findAdmin = async function ({ loginId, name }) {
  return await isExist({ loginId, name });
};
