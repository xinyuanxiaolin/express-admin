const { Op } = require("sequelize");
const TimeoutModel = require("../model/site_timeout");

module.exports = {
  async getSiteTimeout(req, res, next) {
    try {
      const { search, date, page = 1, page_size = 10 } = req.query;
      const where = {};
      if (search) {
        where[Op.or] = [
          { site_name: { [Op.like]: `%${search}%` } },
          { visit_info: { [Op.like]: `%${search}%` } },
        ];
      }

      if (date) {
        where.created_at = {
          [Op.gte]: `${date} 00:00:00`,
          [Op.lt]: `${date} 23:59:59`,
        };
      }
      const { count, rows } = await TimeoutModel.findAndCountAll({
        where,
        order: [["created_at", "DESC"]],
        limit: parseInt(page_size),
        offset: (page - 1) * page_size,
      });

      res.send(successMsg({ total: count, data: rows }, "查询成功!"));
    } catch (error) {
      next(error);
    }
  },
};
