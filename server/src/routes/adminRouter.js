const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { baseAuthority } = require("../dataBase/models/admin");
const adminServ = require("../dataBase/service/adminService");
const md5 = require("md5");
const router = express.Router();
const { asyncHandler } = require("../utils/getsendResult");
const jwt = require("../utils/jwt");

router.post(
  "/reg",
  asyncHandler(async (req, res) => {
    const data = req.body;
    const loginId = uuidv4();
    const adminObj = {
      loginId,
      name: data.name,
      password: md5(data.password),
      authority: data.isRoot
        ? baseAuthority.read | baseAuthority.create | baseAuthority.write
        : baseAuthority.read,
      isRoot: !!data.isRoot || false,
    };

    const admin = await adminServ.addAdmin(adminObj);
    return {
      name: admin.name,
      loginId: admin.loginId,
    };
  }, "register admin finished")
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const data = req.body;
    const { dataValues: admin } = await adminServ.findAdmin({
      loginId: data.loginId || "",
      name: data.name || "",
    });
    if (!admin) {
      //没有该用户
      throw "admin doesn't exist.";
    }

    if (!md5(data.password) === admin.password) {
      //验证密码
      throw "wrong password.";
    }
    const tokenInfo = {
      loginId: admin.loginId,
      name: admin.name,
      authority: admin.authority,
    };
    jwt.publish(res, tokenInfo);
    return tokenInfo;
  }, "login success")
);

router.post(
  "/edit",
  asyncHandler(async (req, res) => {
    const token = jwt.verify(req);
    const data = req.body;
    const admin = await adminServ.findAdmin({ loginId: token.loginId });
    if (!admin.isRoot) {
      //不是root管理员不能修改别的管理员信息
      throw "you are not qualified to edit other admin.";
    }
    if (data.password && token.loginId !== data.loginId) {
      //不允许修改他人的密码
      throw "cannot set set other's password.";
    }
    await adminServ.editAdmin(data.loginId, data);
  })
);

module.exports = { router };
