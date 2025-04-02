const { DataTypes } = require("sequelize");
let db = require("../../config/config.sequelize");
const { tableSync } = require("../../config/config.default"); // 配置文件
// 角色模型
const RoleMenuModel = db.define(
    "role_menu",
    {
        role_id: {
            type: DataTypes.UUID, //数据类型
            primaryKey: true, //是否主键
            allowNull: false, //是否可以是空值
            comment: "角色ID",
        },
        menu_id: {
            type: DataTypes.UUID, //数据类型
            primaryKey: true, //是否主键
            allowNull: false, //是否可以是空值
            comment: "菜单ID",
        },
    },
    {
        // 表名称
        tableName: "role_menu",
        timestamps: false, // 去掉时间
        // 防止自动复数化
        freezeTableName: true,
        comment: "角色菜单中间表",
    }
);
RoleMenuModel.sync({ alter: tableSync }).then(() => {
    console.log("角色菜单中间表已同步!");
});

module.exports = RoleMenuModel;
