const { DataTypes } = require("sequelize");
let db = require("../config/config.sequelize");
const { tableSync } = require("../config/config.default"); // 配置文件
// 用户信息表模型
const UserInfoModel = db.define(
    "userinfo",
    {
        userid: {
            type: DataTypes.CHAR, //数据类型
            primaryKey: true, //是否主键
            comment: "用户id",
        },
        avatar: {
            type: DataTypes.TEXT, //数据类型
            allowNull: true, //是否可以是空值
            comment: "头像",
        },
        nickname: {
            type: DataTypes.STRING, //数据类型
            allowNull: true, //是否可以是空值
            comment: "昵称",
        },
        phone: {
            type: DataTypes.INTEGER, //数据类型
            allowNull: true, //是否可以是空值
            comment: "手机号",
        },
        wechat: {
            type: DataTypes.STRING, //数据类型
            allowNull: true, //是否可以是空值
            comment: "微信号",
        },
    },
    {
        // 表名称
        tableName: "userInfo",
        id: false,
        // 防止自动复数化
        freezeTableName: true,
        timestamps: false, // 去掉时间
        comment: "用户信息表",
    }
);
// 同步表操作
UserInfoModel.sync({ alter: tableSync }).then(() => {
    console.log("用户信息表已同步!");
});
module.exports = UserInfoModel;
