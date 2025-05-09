const { Op, Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const db = require("../config/config.sequelize");
const getSpiderModel = require("../model/spider_genzong");

// 获取当前日期对应的表名（按周）
function getTableNameByDate(date = new Date()) {
  const year = date.getFullYear();
  const week = Math.ceil((date.getDate() + 6 - date.getDay()) / 7);
  return `spider_genzong_${year}w${week}`;
}

// 确保表存在（不存在则自动创建并加索引）
async function ensureTableExists(tableName) {
  const [results] = await db.query(`SHOW TABLES LIKE :tableName`, {
    replacements: { tableName },
  });
  if (results.length === 0) {
    const model = getSpiderModel(tableName);
    await model.sync();

    // 添加索引
    await db.query(
      `ALTER TABLE \`${tableName}\` 
       ADD INDEX idx_host (host), 
       ADD INDEX idx_ip (ip),
       ADD INDEX idx_type (type),
       ADD INDEX idx_url (url),
       ADD INDEX idx_referer (referer),
       ADD INDEX idx_catch_time (catch_time),
       ADD INDEX idx_created_time (created_time)`
    );
  }
}

// 获取最近 N 周的表名列表
function getRecentWeekTables(n = 4) {
  const now = new Date();
  return Array.from({ length: n }).map((_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - i * 7);
    return getTableNameByDate(d);
  });
}

module.exports = {
  async writeSpiderLogs(req, res, next) {
    try {
      const { type, url, referer, ip, host, time } = req.body;
      if (!type || !url || !ip || !host) {
        return res.status(400).json({ message: "缺少必要参数" });
      }

      const catchTime = time ? new Date(time * 1000) : new Date();
      const tableName = getTableNameByDate(catchTime);

      await ensureTableExists(tableName);

      const Model = getSpiderModel(tableName);
      await Model.create({
        id: uuidv4(),
        type,
        url,
        referer,
        ip,
        host,
        catch_time: catchTime,
        created_time: new Date(),
      });

      res.json({ message: "日志写入成功" });
    } catch (err) {
      next(err);
    }
  },

async getSpiderLogs(req, res, next) {
  try {
    const {
      page = 1,
      page_size = 10,
      host,
      ip,
      type,
      url,
      referer,
      catch_time
    } = req.query;

    const where = {};
    if (host) where.host = { [Op.like]: `%${host}%` };
    if (ip) where.ip = { [Op.like]: `%${ip}%` };
    if (type) where.type = type;
    if (url) where.url = { [Op.like]: `%${url}%` };
    if (referer) where.referer = { [Op.like]: `%${referer}%` };
    let targetTables = [];

    if (catch_time) {
      // 用户指定了时间，只查对应表
      const date = new Date(`${catch_time} 00:00:00`);
      const tableName = getTableNameByDate(date);
      await ensureTableExists(tableName);
      targetTables.push(tableName);

      // 补充查询条件
      where.catch_time = {
        [Op.gte]: new Date(`${catch_time} 00:00:00`),
        [Op.lt]: new Date(`${catch_time} 23:59:59`),
      };
    } else {
      // 没传时间，查最近 4 周
      targetTables = getRecentWeekTables(4);
      for (const table of targetTables) {
        await ensureTableExists(table);
      }
    }

    const allResults = [];

    for (const table of targetTables) {
      const Model = getSpiderModel(table);
      try {
        const data = await Model.findAll({ where });
        allResults.push(...data.map((d) => d.toJSON()));
      } catch (_) {
        // 某些表结构不匹配，忽略
      }
    }

    allResults.sort(
      (a, b) => new Date(b.created_time) - new Date(a.created_time)
    );

    const start = (page - 1) * page_size;
    const paged = allResults.slice(start, start + parseInt(page_size));

    res.send(successMsg({ total: allResults.length, data: paged }, "查询成功"));
  } catch (err) {
    next(err);
  }
}

};
