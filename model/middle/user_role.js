const { DataTypes } = require("sequelize");
let db = require("../../config/config.sequelize");
const { tableSync } = require("../../config/config.default"); // 配置文件
// 角色模型
const UserRoleModel = db.define(
    "user_role",
    {
        user_id: {
            type: DataTypes.UUID, //数据类型
            primaryKey: true, //是否主键
            allowNull: false, //是否可以是空值
            comment: "用户ID",
        },
        role_id: {
            type: DataTypes.UUID, //数据类型
            primaryKey: true, //是否主键
            allowNull: false, //是否可以是空值
            comment: "角色ID",
        },
    },
    {
        // 表名称
        tableName: "user_role",
        timestamps: false, // 去掉时间
        // 防止自动复数化
        freezeTableName: true,
        comment: "用户角色中间表",
    }
);
UserRoleModel.sync({ alter: tableSync }).then(() => {
    console.log("用户角色中间表已同步!");
});

module.exports = UserRoleModel;
