const { Op, literal } = require("sequelize");
const SpiderModel = require("../model/spider");
const ShouluModel = require("../model/site_shoulu");

module.exports = {
  async getSpider(req, res, next) {
    try {
      const { domain, date, type, page = 1, page_size = 10, by_count, daoban } = req.query;
      const where = {};

      // 域名筛选
      if (domain) {
        where.domain = {
          [Op.like]: `%${domain}%`
        };
      }

      // 类型筛选
      if (type) {
        where.type = type;
      }

      // 日期筛选
      if (date) {
        where.created_time = {
          [Op.gte]: `${date} 00:00:00`,
          [Op.lt]: `${date} 23:59:59`,
        };
      }

      // 伪造站点筛选（daoban）
      if (daoban === "1") {
        const web = [
          "tbfys.com", "bhkys.com", "chgys.com", "ctpys.com", "dglys.com",
          "fbhys.com", "flfys.com", "fzcys.com", "gcqys.com", "gndys.com",
          "gslys.com", "hgfys.com", "hqfys.com", "jdgys.com", "jknys.com",
          "kklys.com", "kpmys.com", "kpzys.com", "kqnys.com", "kzzys.com",
          "ldhys.com", "lzkys.com", "ngdys.com", "npjys.com", "nqxys.com",
          "nsbys.com", "nxcys.com", "nxzys.com", "pbdys.com", "plpys.com",
          "qbpys.com", "qdzys.com", "qffys.com", "qjtys.com", "rjxys.com",
          "rkmys.com", "rqcys.com", "rtcys.com", "rtpys.com", "sfmys.com",
          "skhys.com", "smdys.com", "tbqys.com", "tdzys.com", "tpnys.com",
          "trcys.com", "xgcys.com", "xgnys.com", "xrlys.com", "zfhys.com"
        ];
        where.domain = {
          ...(where.domain || {}),
          [Op.in]: web
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

      const domains = rows.map(row => row.domain);

      // 查询收录数据
      const shouluCounts = await ShouluModel.findAll({
        attributes: ['site_name', [literal('COUNT(*)'), 'total']],
        where: {
          site_name: {
            [Op.in]: domains
          }
        },
        group: ['site_name']
      });

      const countMap = {};
      shouluCounts.forEach(item => {
        countMap[item.site_name] = item.dataValues.total;
      });

      const result = rows.map(row => {
        const data = row.toJSON();
        data.shoulu_all = countMap[data.domain] || 0;
        return data;
      });

      res.send(successMsg({ total: count, data: result }, "查询成功!"));
    } catch (error) {
      next(error);
    }
  },
};
