const RoleModel = require("../model/role");
const RoleMenuModel = require("../model/middle/role_menu");
const db = require("../config/config.sequelize");
module.exports = {
    // 新增角色
    async roleAdd(req, res, next) {
        try {
            const { menuIds } = req.body;
            const result = await RoleModel.create(req.body);
            let batch = [];
            for (const i in menuIds) {
                batch.push({
                    role_id: result.role_id,
                    menu_id: menuIds[i],
                });
            }
            RoleMenuModel.bulkCreate(batch);
            if (result) {
                res.send(successMsg(result, "新增成功!"));
            } else {
                res.send(errorMsg(result, "新增失败!"));
            }
        } catch (error) {
            next(error);
        }
    },
    // 编辑角色
    async roleEdit(req, res, next) {
        try {
            const { role_id, menuIds } = req.body;
            const result = await RoleModel.update(req.body, {
                where: { role_id },
                limit: 1,
            });
            RoleMenuModel.destroy({ where: { role_id: role_id } }).then(() => {
                let batch = [];
                for (const i in menuIds) {
                    batch.push({
                        role_id: role_id,
                        menu_id: menuIds[i],
                    });
                }
                RoleMenuModel.bulkCreate(batch);
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
    // 查询角色和菜单之间的关联表
    async roleMenuTreeList(req, res, next) {
        try {
            const { roleId } = req.query;
            db.query(`SELECT * FROM role_menu LEFT JOIN menu ON role_menu.menu_id = menu.id WHERE role_id = '${roleId}'`).then((result) => {
                if (result) {
                    res.send(successMsg(result[0], "查询成功!"));
                } else {
                    res.send(errorMsg(result[0], "查询失败!"));
                }
            });
        } catch (error) {
            next(error);
        }
    },
    // 删除角色
    async roleDelete(req, res, next) {
        try {
            const { id } = req.query;
            const result = await RoleModel.destroy({
                where: { role_id: id },
            });
            RoleMenuModel.destroy({
                where: { role_id: id },
            });
            if (result != 0) {
                res.send(successMsg(result, "删除成功!"));
            } else {
                res.send(errorMsg("删除失败,未查询到该数据!"));
            }
        } catch (error) {
            next(error);
        }
    },
};
