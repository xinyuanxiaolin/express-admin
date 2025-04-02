const { apiPrefix } = require('../config/config.default')   // 配置文件
// 配置白名单，不走token
let urlList = []
let whiteList = [
    '/user/login',
    '/user/register',
]
whiteList.map(item => {
    urlList.push(`${apiPrefix}${item}`)
})
module.exports = {urlList}
