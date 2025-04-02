const { DataTypes } = require("sequelize");
let db = require("../config/config.sequelize");
const { tableSync } = require("../config/config.default"); // 配置文件
// 角色模型
const RoleModel = db.define(
    "role",
    {
        role_id: {
            type: DataTypes.UUID, //数据类型
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true, //是否主键
        },
        rolename: {
            type: DataTypes.STRING, //数据类型
            allowNull: false, //是否可以是空值
            comment: "角色名称",
        },
        perms: {
            type: DataTypes.STRING, //数据类型
            comment: "权限字符",
        },
        sortno: {
            type: DataTypes.INTEGER, //数据类型
            comment: "排序",
        },
        status: {
            type: DataTypes.INTEGER, //数据类型
            defaultValue: 0, //默认值
            comment: "角色状态( 0 正常 1 停用)",
        },
    },
    {
        // 表名称
        tableName: "role",
        // 防止自动复数化
        freezeTableName: true,
        comment: "角色表",
    }
);
RoleModel.sync({ alter: tableSync }).then(() => {
    console.log("角色表已同步!");
});

module.exports = RoleModel;
