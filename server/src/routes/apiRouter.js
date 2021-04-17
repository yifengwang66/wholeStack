const express = require("express");
const router = express.Router();
const { router: adminRouter } = require("./adminRouter");
const { router: itemRouter } = require("./itemRouter");

router.use("/admin", adminRouter);
router.use("/item", itemRouter);

module.exports = {
  router,
};
