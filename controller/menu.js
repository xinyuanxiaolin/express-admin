const MenuModel = require("../model/menu");
const db = require("../config/config.sequelize");
const { recursionTree } = require("../util/index");
module.exports = {
    // 菜单列表-树结构
    async treeList(req, res, next) {
        try {
            let menu = await MenuModel.findAll({
                order: [["sortNo", "Asc"]],
            });
            let result = recursionTree(menu);
            res.send(successMsg(result));
        } catch (error) {
            next(error);
        }
    },
    // 删除菜单
    async menuDelete(req, res, next) {
        try {
            const { id } = req.query;
            if (!id) {
                res.send(errorMsg("id不能为空!"));
                return;
            }
            db.query(`SELECT COUNT(menu_id) FROM role_menu WHERE menu_id = '${id}'`).then((roleMenu) => {
                console.log(roleMenu);
            });
            const result = await MenuModel.destroy({
                where: { id },
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
