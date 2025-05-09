const { DataTypes } = require("sequelize");
const db = require("../config/config.sequelize");
// 动态建表
function getSpiderModel(tableName) {
  return db.define(tableName, {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    host: { type: DataTypes.STRING, allowNull: false },
    ip: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    referer: { type: DataTypes.STRING, allowNull: false },
    catch_time: { type: DataTypes.DATE, allowNull: true },
    created_time: { type: DataTypes.DATE, allowNull: false },
  }, {
    tableName,
    freezeTableName: true,
    timestamps: false,
  });
}

module.exports = getSpiderModel;
