// 导出表格行为控制层
const { generateExcel } = require("../util/exportExcel");
const ShouluModel = require("../model/site_shoulu");

module.exports = {
  /* 
        收录情况表格
    */
  // 导出所有收录
  async exportShouluAll(req, res) {
    const rows = await ShouluModel.findAll({ raw: true });
    // 自定义 data 格式：对 rows 进行处理并构建新的 data 数组
    const data = rows.map((row) => {
      return {
        site_name: row.site_name, // 网站名
        title: row.title, // 标题
        shoulu_time: row.shoulu_time, // 收录时间（转换为日期）
        update_time: row.update_time, // 更新时间（转换为日期）
      };
    });
    const workbook = await generateExcel({
      sheets: [
        {
          name: "全部收录数据",
          columns: [
            { label: "网站名", prop: "site_name" },
            { label: "标题", prop: "title" },
            { label: "收录时间", prop: "shoulu_time" },
            { label: "更新时间", prop: "update_time" },
          ],
          data: data,
        },
      ],
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="shoulu_all.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  },

  //导出周收
  async exportWeekly(req, res) {
    const rows = await ShouluModel.findAll({ raw: true });
    const filtered = rows.filter(
      (row) =>
        row.shoulu_time.includes("小时") || row.shoulu_time.includes("天")
    );
    const data = filtered.map((row) => {
      return {
        site_name: row.site_name, // 网站名
        title: row.title, // 标题
        shoulu_time: row.shoulu_time, // 收录时间（转换为日期）
        update_time: row.update_time, // 更新时间（转换为日期）
      };
    });
    const workbook = await generateExcel({
      sheets: [
        {
          name: "周收数据",
          columns: [
            { label: "网站名", prop: "site_name" },
            { label: "标题", prop: "title" },
            { label: "收录时间", prop: "shoulu_time" },
            { label: "更新时间", prop: "update_time" },
          ],
          data: data,
        },
      ],
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=shoulu_weekly.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  },
};
