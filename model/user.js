const { DataTypes } = require("sequelize");
let db = require("../config/config.sequelize");
const { tableSync } = require("../config/config.default"); // 配置文件
const UserInfoModel = require("./userInfo");
// 用户模型
const UserModel = db.define(
    "user",
    {
        id: {
            type: DataTypes.UUID, //数据类型
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true, //是否主键
        },
        username: {
            type: DataTypes.STRING, //数据类型
            allowNull: false, //是否可以是空值
            comment: "用户名称",
        },
        password: {
            type: DataTypes.STRING, //数据类型
            allowNull: false, //是否可以是空值
            comment: "用户密码",
        },
    },
    {
        // 表名称
        tableName: "user",
        // 防止自动复数化
        freezeTableName: true,
        comment: "用户表",
    }
);
UserModel.hasOne(UserInfoModel);
// UserInfoModel.belongsTo(UserModel);
// 同步表操作
UserModel.sync({ alter: tableSync }).then(() => {
    console.log("用户表已同步!");
});

module.exports = UserModel;
