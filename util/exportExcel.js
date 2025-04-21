// 导出表格功能
const ExcelJS = require("exceljs");

async function generateExcel({ sheets }) {
  const workbook = new ExcelJS.Workbook();

  for (const sheet of sheets) {
    const ws = workbook.addWorksheet(sheet.name || 'Sheet1');

    // 添加表头
    if (sheet.columns && sheet.columns.length > 0) {
      ws.columns = sheet.columns.map(col => ({
        header: col.label,
        key: col.prop,
        width: col.width || 20
      }));
    }

    // 添加数据
    sheet.data.forEach(row => {
      ws.addRow(row);
    });
  }
  return workbook;
}

module.exports = {
  generateExcel
};
