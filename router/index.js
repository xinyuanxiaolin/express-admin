const express = require("express");
const router = express.Router();
const { injectControllerRouter } = require('../plugin/bootstrap.js')
/**
 * 自动注入控制器和模型并与路由进行绑定
 */
injectControllerRouter(router,[]).then(routers => {
    router.use(routers)
})

// 系统
router.use(require("./system"));
// 用户
router.use(require("./user"));
// 角色
router.use(require("./role"));
// 菜单
router.use(require("./menu"));

module.exports = router;