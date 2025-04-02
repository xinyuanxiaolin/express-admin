const { DataTypes } = require("sequelize");
let db = require("../config/config.sequelize");
const { tableSync } = require("../config/config.default"); // 配置文件
// 菜单模型
const MenuModel = db.define(
    "menu",
    {
        id: {
            type: DataTypes.UUID, //数据类型
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true, //是否主键
        },
        parent_id: {
            type: DataTypes.STRING, //数据类型
            defaultValue: "0", // 设置默认值
            comment: "父级id",
        },
        type: {
            type: DataTypes.INTEGER, //数据类型
            allowNull: false, //是否可以是空值
            comment: "菜单类型 1.一级菜单 2.子菜单 3.按钮/权限",
        },
        name: {
            type: DataTypes.STRING, //数据类型
            allowNull: false, //是否可以是空值
            comment: "菜单名称",
        },
        component: {
            type: DataTypes.STRING, //数据类型
            comment: "前端组件",
        },
        url: {
            type: DataTypes.STRING, //数据类型
            comment: "访问路径",
        },
        perms: {
            type: DataTypes.STRING, //数据类型
            comment: "权限字符",
        },
        icon: {
            type: DataTypes.STRING, //数据类型
            comment: "菜单图标",
        },
        sortno: {
            type: DataTypes.INTEGER, //数据类型
            comment: "排序",
        },
        hidden: {
            type: DataTypes.BOOLEAN, //数据类型
            comment: "隐藏路由",
        },
    },
    {
        // 表名称
        tableName: "menu",
        // 防止自动复数化
        freezeTableName: true,
        comment: "菜单表",
    }
);
// 同步表操作
MenuModel.sync({ alter: tableSync }).then(() => {
    console.log("菜单表已同步!");
});

module.exports = MenuModel;
