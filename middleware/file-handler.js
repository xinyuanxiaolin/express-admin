// 文件处理中间件
const fs = require('fs')            // 文件模块
const multer = require('multer')   // 文件上传依赖
const moment = require('moment')    // 时间处理库

// 创建文件路径
let path = `./upload/${moment().format("YYYY-MM-DD")}`
// 判断文件夹是否存在，不存在则创建
if(!fs.existsSync(path)){
    fs.mkdirSync(path)  // 创建文件路径
}
// 配置文件驱动
const storage = multer.diskStorage({ 
    //保存路径
    destination: function (req, file, cb) {
        cb(null, path)
    },
    //保存在 destination 中的文件名
    filename: function (req, file, cb) {    
        cb(null, Date.now()+'-'+file.originalname)
    }
})
// 调用驱动
const upload = multer({ storage: storage })
module.exports = upload