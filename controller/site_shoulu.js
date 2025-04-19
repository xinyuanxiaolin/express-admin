const { Op } = require("sequelize");
const ShouluModel = require("../model/site_shoulu");
const moment = require("moment");

module.exports = {
  async getShouluInfo(req, res, next) {
    try {
      const {
        site_name,
        title,
        shoulu_type, // 1 日收 2 周收 3 月收
        page = 1,
        page_size = 10
      } = req.query;

      const where = {};

      // 模糊匹配网站名
      if (site_name) {
        where.site_name = { [Op.like]: `%${site_name}%` };
      }

      // 模糊匹配标题
      if (title) {
        where.title = { [Op.like]: `%${title}%` };
      }

      // 收录时间筛选
      if (shoulu_type) {
        let keywords = [];
        switch (parseInt(shoulu_type)) {
          case 1: // 日收：包含“小时”
            keywords.push({ shoulu_time: { [Op.like]: `%小时%` } });
            break;
          case 2: // 周收：包含“小时”或“天”
            keywords.push({ shoulu_time: { [Op.like]: `%小时%` } });
            keywords.push({ shoulu_time: { [Op.like]: `%天%` } });
            break;
          case 3: { // 月收：包含“小时”或“天”或“3月3日”这种在一个月内的
            const now = moment();
            const oneMonthAgo = moment().subtract(1, 'months');

            const rows = await ShouluModel.findAll(); // 全部查出，过滤处理

            const filtered = rows.filter(row => {
              const timeStr = row.shoulu_time;

              // 忽略带“年”的（例如“2024年3月5日”）
              if (timeStr.includes("年")) return false;

              // 包含“小时”或“天”直接匹配
              if (timeStr.includes("小时") || timeStr.includes("天")) return true;

              // 匹配 “3月5日” 这种字符串
              const match = timeStr.match(/(\d{1,2})月(\d{1,2})日/);
              if (match) {
                const month = parseInt(match[1]);
                const day = parseInt(match[2]);

                const dateStr = `${moment().year()}-${month}-${day}`;
                const date = moment(dateStr, "YYYY-M-D");

                return date.isBetween(oneMonthAgo, now, null, '[]'); // 包含边界
              }

              return false;
            });

            const paged = filtered.slice((page - 1) * page_size, page * page_size);
            return res.send(
              successMsg({ total: filtered.length, data: paged }, "查询成功！")
            );
          }
        }

        // 普通数据库匹配的情况（不包含 3月x日）
        where[Op.or] = keywords;
      }

      // 正常分页
      const { count, rows } = await ShouluModel.findAndCountAll({
        where,
        order: [["update_time", "DESC"]],
        limit: parseInt(page_size),
        offset: (page - 1) * page_size,
      });

      res.send(successMsg({ total: count, data: rows }, "查询成功!"));
    } catch (error) {
      next(error);
    }
  },
};
