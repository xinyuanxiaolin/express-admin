const { Op } = require("sequelize");
const DuishouModel = require("../model/duishou");

module.exports = {
  async getVideoList(req, res, next) {
    try {
      const {
        platform_name,
        batch_time,
        search_name,
        page = 1,
        page_size = 10,
      } = req.query;

      const where = {};

      if (platform_name) {
        where.platform_name = platform_name;
      }

      if (batch_time) {
        // 查询当天所有时间段内的数据
        where.batch_time = {
          [Op.gte]: `${batch_time} 00:00:00`,
          [Op.lt]: `${batch_time} 23:59:59`,
        };
      }

      if (search_name) {
        where.title = {
          [Op.like]: `%${search_name}%`,
        };
      }

      const { count, rows } = await DuishouModel.findAndCountAll({
        where,
        order: [["update_time", "DESC"]],
        limit: parseInt(page_size),
        offset: (page - 1) * page_size,
      });

      res.send(successMsg({ total: count, data: rows }, "查询成功!"));
    } catch (error) {
      next(error);
    }
  }
};
