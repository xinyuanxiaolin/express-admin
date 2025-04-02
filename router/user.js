const express = require("express");
const router = express.Router();
const UserControler = require("../controller/user");

// 用户登录
router.post("/user/login", UserControler.login);
// 注册用户
router.post("/user/register", UserControler.register);
// 用户列表
router.get("/user/userList", UserControler.userList);
// 新增用户
router.post("/user/userAdd", UserControler.userAdd);
// 编辑用户
router.put("/user/userEdit", UserControler.userEdit);
// 用户详情
router.get("/user/userInfo", UserControler.userInfo);
// 重置密码
router.post("/user/resetPassword", UserControler.resetPassword);
// 根据用户id查询用户和角色之间的关联表
router.get("/user/userRoleList", UserControler.userRoleList);
module.exports = router;
