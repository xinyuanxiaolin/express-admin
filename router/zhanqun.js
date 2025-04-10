const express = require("express");
const router = express.Router();
const siteTimeoutController = require("../controller/site_timeout");


/*
    站群管理
*/

// 获取网站测速情况
router.get("/zhanqun/site_timeout", siteTimeoutController.getSiteTimeout);
module.exports = router;
