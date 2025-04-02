const express = require("express");
const router = express.Router();
const SystemControler = require('../controller/file')
const upload = require('../middleware/file-handler.js')
/**
 * 文件操作
 */
// 文件上传
router.post('/system/file/uploadFile',upload.array('file'),SystemControler.uploadFile)
// 文件删除
router.delete('/system/file/deleteFile',SystemControler.deleteFile)
/*************************/ 
/**
 * 邮件操作
*/
// 发送邮件
router.post('/sendMail',SystemControler.sendMail)
/*************************/ 
module.exports = router
