const UserModel = require("../model/user");
const UserInfoModel = require("../model/userInfo");
const UserRoleModel = require("../model/middle/user_role");
const jwt = require("jsonwebtoken");
const { secretKEY, expiresIn } = require("../config/config.default"); // 配置文件
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { filterObj } = require("../util/index");
const db = require("../config/config.sequelize");
// 用户登录
module.exports = {
    // 登录
    async login(req, res, next) {
        try {
            let { username, password } = req.body;
            const token = "Bearer " + jwt.sign({ username: username }, secretKEY, { expiresIn: expiresIn });
            await UserModel.findAll({
                where: { username },
                limit: 1,
                include: [
                    {
                        model: UserInfoModel,
                    },
                ],
            }).then((data) => {
                if (data.length != 0) {
                    let isPasswordValid = bcrypt.compareSync(password, data[0].password);
                    if (!isPasswordValid) {
                        res.send(errorMsg("密码错误!"));
                    } else {
                        res.send(successMsg(data[0], "登录成功", { token }));
                    }
                } else {
                    res.send(errorMsg("用户不存在!"));
                }
            });
        } catch (error) {
            next(error);
        }
    },
    // 注册用户
    async register(req, res, next) {
        try {
            const { username, password } = req.body;
            await UserModel.findAll({
                where: { username },
            }).then(async (data) => {
                if (data.length != 0) {
                    res.send(errorMsg("用户名重复!"));
                } else {
                    const bcryptPassword = bcrypt.hashSync(password, 10);
                    const result = await UserModel.create({ username: username, password: bcryptPassword });
                    res.send(successMsg(result, "新增成功!"));
                }
            });
        } catch (error) {
            next(error);
        }
    },
    // 用户列表
    async userList(req, res, next) {
        try {
            let { current, pageSize } = req.query;
            // 对入参进行检测，是否和模型一致
            await UserModel.describe().then(async (data) => {
                let param = {};
                for (const key1 in data) {
                    for (const key2 in filterObj(req.query)) {
                        if (key2 == key1) {
                            param[key2] = filterObj(req.query)[key2];
                        }
                    }
                }
                let result = {};
                // 设置分页数量
                let size = pageSize ? pageSize * 1 : 10;
                // 传入参数设置成模糊查询
                let paramWhere = {};
                for (const key in param) {
                    paramWhere[key] = {
                        [Op.like]: `%${param[key]}%`,
                    };
                }
                if (current) {
                    result = await UserModel.findAll({
                        where: paramWhere,
                        order: [["createdAt", "DESC"]],
                        offset: (current * 1 - 1) * size,
                        limit: size,
                        attributes: { exclude: ["password"] },
                        include: [
                            {
                                model: UserInfoModel,
                            },
                        ],
                    });
                    let total = await UserModel.count();
                    res.send(
                        successMsg(result, "查询成功!", {
                            total: total,
                            current: current * 1,
                            pageSize: size,
                        })
                    );
                } else {
                    result = await UserModel.findAll({
                        where: paramWhere,
                        attributes: { exclude: ["password"] },
                    });
                    res.send(successMsg(result));
                }
            });
        } catch (error) {
            next(error);
        }
    },
    // 新增用户
    async userAdd(req, res, next) {
        try {
            const { username, password, roleIds } = req.body;
            const bcryptPassword = bcrypt.hashSync(password, 10);
            const result = await UserModel.create({ username: username, password: bcryptPassword });
            UserInfoModel.create({
                userid: result.id,
                ...req.body.userinfo,
            });
            let batch = [];
            for (const i in roleIds) {
                batch.push({
                    user_id: result.id,
                    role_id: roleIds[i],
                });
            }
            UserRoleModel.bulkCreate(batch);
            res.send(successMsg(result, "新增成功!"));
        } catch (error) {
            next(error);
        }
    },
    // 编辑用户
    async userEdit(req, res, next) {
        try {
            const { id, password, roleIds } = req.body;
            if (password) {
                res.send(errorMsg("非法参数!"));
            }
            const result = await UserModel.update(req.body, {
                where: { id },
                limit: 1,
            });
            UserInfoModel.update(req.body.userinfo, {
                where: { userid: id },
                limit: 1,
            });
            UserRoleModel.destroy({ where: { user_id: id } }).then(() => {
                let batch = [];
                for (const i in roleIds) {
                    batch.push({
                        user_id: id,
                        role_id: roleIds[i],
                    });
                }
                UserRoleModel.bulkCreate(batch);
            });
            if (result[0] != 0) {
                res.send(successMsg(result, "编辑成功!"));
            } else {
                res.send(errorMsg("编辑失败,未查询到该数据!"));
            }
        } catch (error) {
            next(error);
        }
    },
    // 用户详情
    async userInfo(req, res, next) {
        try {
            UserModel.findOne({
                where: { username: req.auth.username },
                attributes: ["id", "username", "createdAt", "updatedAt"],
                include: [{ model: UserInfoModel }],
            }).then((user) => {
                // 查询用户的角色
                let roles = db.query(
                    `SELECT role.role_id,role.perms FROM user_role LEFT JOIN role ON user_role.role_id = role.role_id WHERE user_id = '${user.id}' AND status = 0`
                );
                // 查询用户的菜单权限
                let menuPermission = db.query(
                    `SELECT m.* FROM user_role ur LEFT JOIN role_menu rm ON ur.role_id = rm.role_id LEFT JOIN menu m ON rm.menu_id = m.id WHERE ur.user_id = '${user.id}' ORDER BY sortno ASC`
                );
                Promise.all([roles, menuPermission])
                    .then((data) => {
                        user.dataValues.roles = data[0][0];
                        user.dataValues.menuPermission = data[1][0];
                        user.dataValues.permission = [];
                        if (data[0][0].some((item) => item.perms === "admin")) {
                            user.dataValues.permission = ["*:*:*"];
                        } else {
                            data[1][0].map((item) => {
                                if (item.perms) user.dataValues.permission.push(item.perms);
                            });
                        }
                        if (user) {
                            res.send(successMsg(user, "查询成功!"));
                        } else {
                            res.send(errorMsg("查询失败,未查询到该数据!"));
                        }
                    })
                    .catch((error) => {
                        res.send(errorMsg(error));
                    });
            });
        } catch (error) {
            next(error);
        }
    },
    // 重置密码
    async resetPassword(req, res, next) {
        try {
            const { id, password } = req.body;
            const result = await UserModel.findOne({
                where: { id },
            });
            if (result) {
                const bcryptPassword = bcrypt.hashSync(password, 10);
                UserModel.update(
                    { password: bcryptPassword },
                    {
                        where: { id },
                    }
                ).then((user) => {
                    if (user) {
                        res.send(successMsg("密码重置成功!"));
                    } else {
                        res.send(errorMsg("密码重置失败!"));
                    }
                });
            } else {
                res.send(errorMsg("密码重置失败,用户不存在!"));
            }
        } catch (error) {
            next(error);
        }
    },
    // 根据用户id查询用户和角色之间的关联表
    async userRoleList(req, res, next) {
        try {
            const { userId } = req.query;
            const userRole = await UserRoleModel.findAll({ where: { user_id: userId } });
            let result = userRole.map((item) => {
                return item.role_id;
            });
            if (result) {
                res.send(successMsg(result));
            } else {
                res.send(errorMsg(result));
            }
        } catch (error) {
            next(error);
        }
    },
};
