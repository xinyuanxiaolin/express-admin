const { Op, literal } = require("sequelize");
const SpiderGenZongModel = require("../model/spider_genzong");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  
  async writeSpiderLogs(req, res, next) {
    try {
      const { type, url, referer, ip, host, time } = req.body;

      if (!type || !url || !ip || !host || !time) {
        return res.status(400).json({ message: "缺少必要参数" });
      }

      await SpiderGenZongModel.create({
        id: uuidv4(),
        type,
        url: url,
        referer,
        ip,
        host,
        catch_time: new Date(time * 1000),
        created_time: new Date()
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
      if (catch_time) {
        where.catch_time = {
          [Op.gte]: `${catch_time} 00:00:00`,
          [Op.lt]: `${catch_time} 23:59:59`,
        };
      }

      const { count, rows } = await SpiderGenZongModel.findAndCountAll({
        where,
        order: [["created_time", "DESC"]],
        limit: parseInt(page_size),
        offset: (parseInt(page) - 1) * parseInt(page_size),
      });

      res.json({ total: count, data: rows });
    } catch (err) {
      next(err);
    }
  }
}
