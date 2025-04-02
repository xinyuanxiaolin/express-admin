const express = require("express");
const MenuControler = require("../controller/menu");

const router = express.Router();

router.get("/menu/treeList", MenuControler.treeList);
router.delete("/menu/menuDelete", MenuControler.menuDelete);
module.exports = router;
