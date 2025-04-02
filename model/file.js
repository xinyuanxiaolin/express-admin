const { DataTypes } = require("sequelize");
const db = require("../config/config.sequelize");
const moment = require('moment');
const { tableSync } = require('../config/config.default')   // 配置文件

// 文件模型
const FileModel = db.define(
    "file",
    {
        id: {
            type: DataTypes.UUID, //数据类型
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true, //是否主键
        },
        name: {
            type: DataTypes.STRING, //数据类型
            comment: '文件名称'
        },
        filename: {
            type: DataTypes.STRING, //数据类型
            comment: '文件存储名称'
        },
        type: {
            type: DataTypes.STRING, //数据类型
            comment: '文件类型'
        },
        size: {
            type: DataTypes.INTEGER, //数据类型
            comment: '文件大小'
        },
        suffix: {
            type: DataTypes.STRING, //数据类型
            comment: '文件后缀'
        },
        path: {
            type: DataTypes.TEXT('long'), //数据类型
            comment: '文件路径'
        },
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    },
    {
        // 表名称
        tableName: 'file',
        // 防止自动复数化
        freezeTableName: true,
        comment: '文件表'
    }
)
// 同步表操作
FileModel.sync({ alter: tableSync }).then(() => {
    console.log("文件表已同步!");
})

module.exports = FileModel