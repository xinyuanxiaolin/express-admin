const { Op, literal } = require("sequelize");
const SpiderModel = require("../model/spider");
const ShouluModel = require("../model/site_shoulu");

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

      // 查询主数据
      const { count, rows } = await SpiderModel.findAndCountAll({
        where,
        order,
        limit: parseInt(page_size),
        offset: (page - 1) * page_size,
      });

      // 获取当前页所有 domain
      const domains = rows.map(row => row.domain);

      // 去 ShouluModel 统计每个 domain 的数量（site_name 对应 domain）
      const shouluCounts = await ShouluModel.findAll({
        attributes: ['site_name', [literal('COUNT(*)'), 'total']],
        where: {
          site_name: {
            [Op.in]: domains
          }
        },
        group: ['site_name']
      });

      // 转成 map，便于赋值
      const countMap = {};
      shouluCounts.forEach(item => {
        countMap[item.site_name] = item.dataValues.total;
      });

      // 给每条 spider 数据加上 shoulu_all 字段
      const result = rows.map(row => {
        const data = row.toJSON(); // 如果你用的是Sequelize的实例，需要转JSON
        data.shoulu_all = countMap[data.domain] || 0;
        return data;
      });

      res.send(successMsg({ total: count, data: result }, "查询成功!"));
    } catch (error) {
      next(error);
    }
  },
};
