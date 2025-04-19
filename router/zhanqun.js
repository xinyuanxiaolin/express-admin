const express = require("express");
const router = express.Router();
const siteTimeoutController = require("../controller/site_timeout");
const spiderController = require("../controller/spider");
const siteShouluController = require("../controller/site_shoulu");



/*
    站群管理
*/

// 获取网站测速情况
router.get("/zhanqun/site_timeout", siteTimeoutController.getSiteTimeout);
//获取站群蜘蛛情况
router.get("/zhanqun/get_spider",spiderController.getSpider)
//获取站群头条收录情况
router.get("/zhanqun/site_shoulu",siteShouluController.getShouluInfo)
module.exports = router;
