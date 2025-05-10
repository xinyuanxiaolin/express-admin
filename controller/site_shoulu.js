const { Op } = require("sequelize");
const ShouluModel = require("../model/site_shoulu");
const moment = require("moment");

module.exports = {
  async getShouluInfo(req, res, next) {
    try {
      const {
        site_name,
        title,
        shoulu_type,
        page = 1,
        page_size = 10,
        sort_field,
        sort_order,
        daoban
      } = req.query;

      const where = {};
      if (site_name) where.site_name = { [Op.like]: `%${site_name}%` };
      if (title) where.title = { [Op.like]: `%${title}%` };
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
        where.site_name = {
          ...(where.site_name || {}),
          [Op.in]: web
        };
      }

      // 处理 shoulu_type 条件
      if (shoulu_type) {
        const orConditions = [];
        switch (parseInt(shoulu_type)) {
          case 1:
            orConditions.push({ shoulu_time: { [Op.like]: `%小时%` } });
            break;
          case 2:
            orConditions.push({ shoulu_time: { [Op.like]: `%小时%` } });
            orConditions.push({ shoulu_time: { [Op.like]: `%天%` } });
            break;
          case 3: {
            const now = moment();
            const oneMonthAgo = moment().subtract(1, "months");

            const all = await ShouluModel.findAll({ where });
            const filtered = all.filter((row) => {
              const str = row.shoulu_time;
              if (str.includes("年")) return false;
              if (str.includes("小时") || str.includes("天")) return true;

              const match = str.match(/(\d{1,2})月(\d{1,2})日/);
              if (match) {
                const date = moment(`${moment().year()}-${match[1]}-${match[2]}`, "YYYY-M-D");
                return date.isBetween(oneMonthAgo, now, null, "[]");
              }

              return false;
            });

            // 自定义排序只在 shoulu_time 被指定为排序字段时执行
            const sorted = sort_field === "shoulu_time" && sort_order
              ? filtered.sort((a, b) => {
                  const t1 = parseTimeValue(a.shoulu_time);
                  const t2 = parseTimeValue(b.shoulu_time);
                  return sort_order === "asc" ? t1 - t2 : t2 - t1;
                })
              : filtered.sort((a, b) =>
                  moment(b.update_time).valueOf() - moment(a.update_time).valueOf()
                );

            const paged = sorted.slice((page - 1) * page_size, page * page_size);
            return res.send(successMsg({ total: filtered.length, data: paged }, "查询成功！"));
          }
        }

        if (orConditions.length > 0) {
          where[Op.or] = orConditions;
        }
      }
      if (sort_field && sort_order) {
        // 其他情况统一查询
        const all = await ShouluModel.findAll({ where });

        // 排序逻辑
        let sorted = all;
        if (sort_field === "shoulu_time" && sort_order) {
          sorted = all.sort((a, b) => {
            const t1 = parseTimeValue(a.shoulu_time);
            const t2 = parseTimeValue(b.shoulu_time);
            return sort_order === "asc" ? t1 - t2 : t2 - t1;
          });
        }
        const paged = sorted.slice((page - 1) * page_size, page * page_size);
        return res.send(
          successMsg({ total: sorted.length, data: paged }, "查询成功！")
        );
      } else {
        // 不需要收录排序
        const { count, rows } = await ShouluModel.findAndCountAll({
          where,
          order: [["update_time", "DESC"]],
          limit: parseInt(page_size),
          offset: (page - 1) * page_size,
        });

        res.send(successMsg({ total: count, data: rows }, "查询成功!"));
      }
    } catch (err) {
      next(err);
    }
  }
};

// 转换收录时间为排序值
function parseTimeValue(str) {
  if (!str) return -999999;  // 默认最小值

  // 处理"小时"和"天"的特殊排序
  if (str.includes("小时")) {
    const match = str.match(/(\d+)\s*小时/);
    return moment().unix() - parseInt(match ? match[1] : 0); // 用当前时间戳-小时，保证小时最大
  }

  if (str.includes("天")) {
    const match = str.match(/(\d+)\s*天/);
    return moment().unix() - parseInt(match ? match[1] : 0); // 用当前时间戳-月+日，保证第二大
  }

  // 处理没有年份的日期（将其转化为当前年份的日期）
  if (str.includes("月") && str.includes("日") && !str.includes("年")) {
    const match = str.match(/(\d{1,2})月(\d{1,2})日/);
    if (match) {
      const date = moment(`${moment().year()}-${match[1]}-${match[2]}`, "YYYY-M-D");
      return date.unix();  // 以当前年份的日期进行比较
    }
  }

  // 处理有年份的日期
  if (str.includes("年") && str.includes("月") && str.includes("日")) {
    const match = str.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (match) {
      const date = moment(`${match[1]}-${match[2]}-${match[3]}`, "YYYY-MM-DD");
      return date.unix();  // 使用 Unix 时间戳进行正常排序
    }
  }

  return -999999;  // 无法识别的最小值
}

