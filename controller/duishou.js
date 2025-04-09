// controller/duishouController.js
const DuishouModel = require("../model/duishou");

module.exports = {
  async getVideoList(req, res, next) {
    try {
      const {
        platform_name,
        batch_time,
        page = 1,
        page_size = 10,
      } = req.query;

      const where = {};

      if (platform_name) {
        where.platform_name = platform_name;
      }

      if (batch_time) {
        where.batch_time = batch_time;
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
