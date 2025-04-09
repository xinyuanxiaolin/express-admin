const { DataTypes } = require("sequelize");
let db = require("../config/config.sequelize");
// 菜单模型
const DuishouModel = db.define(
    "video_info",
    {
        id: {
            type: DataTypes.UUID, //数据类型
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true, //是否主键
        },
        platform_name: {
            type: DataTypes.STRING, //数据类型
            defaultValue: "0", // 设置默认值
            comment: "对手",
        },
        title: {
            type: DataTypes.STRING, //数据类型
            allowNull: false, //是否可以是空值
            comment: "名字",
        },
        link: {
            type: DataTypes.TEXT, //数据类型
            allowNull: false, //是否可以是空值
            comment: "链接",
        },
        update_time: {
            type: DataTypes.DATE, //数据类型
            comment: "更新时间",
        },
        batch_time: {
            type: DataTypes.DATE, //数据类型
            comment: "抓取时间",
        },
        created_at: {
            type:DataTypes.DATE,
            comment:"数据创建时间"
        }
    },
    {
        // 表名称
        tableName: "video_info",
        // 防止自动复数化
        freezeTableName: true,
        comment: "对手短剧情况",
        //禁止 Sequelize 自动添加 createdAt 和 updatedAt
        timestamps: false
    }
);

module.exports = DuishouModel;
