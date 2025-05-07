const { apiPrefix } = require('../config/config.default')   // 配置文件
// 配置白名单，不走token
let urlList = ['/zhanqun/spider/write_log']
let whiteList = [
    '/user/login',
    '/user/register',
    '/zhanqun/spider/write_log'
]
whiteList.map(item => {
    urlList.push(`${apiPrefix}${item}`)
})
module.exports = {urlList}
