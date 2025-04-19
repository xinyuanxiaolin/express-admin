const { DataTypes } = require("sequelize");
let db = require("../config/config.sequelize");
const { tableSync } = require("../config/config.default"); // 配置文件

// 测速模型
const ShouluModel = db.define(
    "site_shoulu",
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
        title: {
            type: DataTypes.STRING, //数据类型
            allowNull: false, //是否可以是空值
            comment: "收录标题",
        },
        shoulu_time:{
            type: DataTypes.STRING, //数据类型
            allowNull: true, //是否可以是空值
            comment: "收录时间",
        },
        update_time: {
            type: DataTypes.DATE, //数据类型
            comment: "更新时间",
        },
        create_time: {
            type:DataTypes.DATE,
            comment:"数据创建时间"
        }
    },
    {
        // 表名称
        tableName: "site_shoulu",
        // 防止自动复数化
        freezeTableName: true,
        comment: "头条收录情况表",
        //禁止 Sequelize 自动添加 createdAt 和 updatedAt
        timestamps: false
    }
);


ShouluModel.sync({ alter: tableSync }).then(() => {
    console.log("头条收录情况表已同步!");
});

module.exports = ShouluModel;
