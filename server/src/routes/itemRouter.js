const express = require("express");
const itemServ = require("../dataBase/service/itemService");
const adminServ = require("../dataBase/service/adminService");
const { baseAuthority } = require("../dataBase/models/admin");
const jwt = require("../utils/jwt");
const md5 = require("md5");
const multer = require("multer");
const upload = multer({ desc: "static/" });
const { asyncHandler } = require("../utils/getsendResult");
const router = express.Router();

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    const token = jwt.verify(req);
    const { dataValues: admin } = await adminServ.findAdmin({
      loginId: token.loginId,
    });
    if (!((admin.authority & baseAuthority.create) == baseAuthority.create)) {
      throw "you are not qualified to add items.";
    }
    const data = req.body;
    const itemObj = {
      ...data,
      disPrice: +data.disPrice,
      price: +data.price,
      storage: +data.storage,
      onSale: !!data.onSale,
    };
    const item = await itemServ.addItem(itemObj);
    console.log(item);
    return item;
  })
);

router.post(
  "/edit",
  asyncHandler(async (req, res) => {})
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {})
);

router.get(
  "/",
  asyncHandler(async (req, res) => {})
);

module.exports = { router };
