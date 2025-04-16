const { DataTypes } = require("sequelize");
let db = require("../config/config.sequelize");
const { tableSync } = require("../config/config.default"); // 配置文件

// 统计蜘蛛数量模型
const SpiderModel = db.define(
    "spider",
    {
        id: {
            type: DataTypes.UUID, //数据类型
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true, //是否主键
        },
        domain: {
            type: DataTypes.STRING, //数据类型
            allowNull: false, //是否可以是空值
            comment: "域名",
        },
        type: {
            type: DataTypes.STRING, //数据类型
            allowNull: false, //是否可以是空值
            comment: "蜘蛛类型,1为头条,2为百度",
        },
        count: {
            type: DataTypes.STRING,
            allowNull:false,
            comment: "蜘蛛当日访问次数"
        },
        updated_time: {
            type: DataTypes.DATE, //数据类型
            comment: "更新时间",
        },
        created_time: {
            type:DataTypes.DATE,
            comment:"数据创建时间"
        }
    },
    {
        // 表名称
        tableName: "spider",
        // 防止自动复数化
        freezeTableName: true,
        comment: "蜘蛛统计表",
        //禁止 Sequelize 自动添加 createdAt 和 updatedAt
        timestamps: false
    }
);

SpiderModel.sync({ alter: tableSync }).then(() => {
    console.log("蜘蛛统计表已同步!");
});

module.exports = SpiderModel;
