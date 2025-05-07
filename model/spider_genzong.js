const { DataTypes } = require("sequelize");
let db = require("../config/config.sequelize");
const { tableSync } = require("../config/config.default"); // 配置文件

// 蜘蛛路径跟踪脚本
const SpiderModel = db.define(
    "spider_gengzong",
    {
        id: {
            type: DataTypes.UUID, //数据类型
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true, //是否主键
        },
        host: {
            type: DataTypes.STRING, //数据类型
            allowNull: false, //是否可以是空值
            comment: "网站域名",
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "蜘蛛ip"
        },
        type: {
            type: DataTypes.STRING, //数据类型
            allowNull: false, //是否可以是空值
            comment: "蜘蛛类型,1为头条,2为百度",
        },
        url: {
            type: DataTypes.STRING,
            allowNull:false,
            comment: "访问网站页面路径"
        },
        referer:{
            type: DataTypes.STRING,
            allowNull:false,
            comment:"来源"
        },
        catch_time: {
            type: DataTypes.DATE, //数据类型
            comment: "蜘蛛爬取时间",
        },
        created_time: {
            type:DataTypes.DATE,
            comment:"数据创建时间"
        }
    },
    {
        // 表名称
        tableName: "spider_genzong",
        // 防止自动复数化
        freezeTableName: true,
        comment: "蜘蛛路径跟踪统计表",
        //禁止 Sequelize 自动添加 createdAt 和 updatedAt
        timestamps: false
    }
);

SpiderModel.sync({ alter: tableSync }).then(() => {
    console.log("蜘蛛路径跟踪统计表已同步!");
});

module.exports = SpiderModel;
