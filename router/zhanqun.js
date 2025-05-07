const express = require("express");
const router = express.Router();
const siteTimeoutController = require("../controller/site_timeout");
const spiderController = require("../controller/spider");
const siteShouluController = require("../controller/site_shoulu");
const exportController = require("../controller/export");
const spiderGenZongController =  require("../controller/spider_genzong")



/*
    站群管理
*/

// 获取网站测速情况
router.get("/zhanqun/site_timeout", siteTimeoutController.getSiteTimeout);
//获取站群蜘蛛情况
router.get("/zhanqun/get_spider",spiderController.getSpider)
//获取站群头条收录情况
router.get("/zhanqun/site_shoulu",siteShouluController.getShouluInfo)
//写入站群蜘蛛路径相关内容
router.post('/zhanqun/spider/write_log',spiderGenZongController.writeSpiderLogs)
//获取站群蜘蛛路径内容
router.get('/zhanqun/spider/get_log',spiderGenZongController.getSpiderLogs)


//导出全部收录情况excel
router.get("/shoulu/export/all",exportController.exportShouluAll)
//导出周收情况excel
router.get("/shoulu/export/week",exportController.exportWeekly)
// 导出所有蜘蛛excel
router.get("/spider/export/all",exportController.exportSpiderAll)


module.exports = router;
