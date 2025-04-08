const express = require("express");
const DuishouControler = require("../controller/duishou");
const router = express.Router();

/*
    对手管理
*/

// 获取对手数据情况
router.post("/duishou/video_info", DuishouControler.videoInfo);
module.exports = router;
