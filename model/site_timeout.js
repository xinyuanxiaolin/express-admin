const { DataTypes } = require("sequelize");
let db = require("../config/config.sequelize");
const { tableSync } = require("../config/config.default"); // 配置文件

// 测速模型
const TimeoutModel = db.define(
    "site_timeout",
    {
        id: {
            type: DataTypes.UUID, //数据类型
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true, //是否主键
        },
        site_name: {
            type: DataTypes.STRING, //数据类型
            allowNull: false, //是否可以是空值
            comment: "网站名",
        },
        visit_info: {
            type: DataTypes.STRING, //数据类型
            allowNull: false, //是否可以是空值
            comment: "测速情况",
        },
        updated_at: {
            type: DataTypes.DATE, //数据类型
            comment: "更新时间",
        },
        created_at: {
            type:DataTypes.DATE,
            comment:"数据创建时间"
        }
    },
    {
        // 表名称
        tableName: "site_timeout",
        // 防止自动复数化
        freezeTableName: true,
        comment: "站群测速",
        //禁止 Sequelize 自动添加 createdAt 和 updatedAt
        timestamps: false
    }
);


TimeoutModel.sync({ alter: tableSync }).then(() => {
    console.log("网速检测表已同步!");
});

module.exports = TimeoutModel;
