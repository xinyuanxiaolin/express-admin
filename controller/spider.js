const { Op, literal } = require("sequelize");
const SpiderModel = require("../model/spider");

module.exports = {
  async getSpider(req, res, next) {
    try {
      const { domain, date, type, page = 1, page_size = 10, by_count } = req.query;
      const where = {};

      if (domain) {
        where.domain = {
          [Op.like]: `%${domain}%`
        };
      }

      if (type) {
        where.type = type;
      }

      if (date) {
        where.created_time = {
          [Op.gte]: `${date} 00:00:00`,
          [Op.lt]: `${date} 23:59:59`,
        };
      }

      // 排序逻辑
      let order = [["created_time", "DESC"]];
      if (by_count === "asc") {
        order = [[literal("CAST(count AS UNSIGNED)"), "ASC"]];
      } else if (by_count === "desc") {
        order = [[literal("CAST(count AS UNSIGNED)"), "DESC"]];
      }

      const { count, rows } = await SpiderModel.findAndCountAll({
        where,
        order,
        limit: parseInt(page_size),
        offset: (page - 1) * page_size,
      });

      res.send(successMsg({ total: count, data: rows }, "查询成功!"));
    } catch (error) {
      next(error);
    }
  },
};
