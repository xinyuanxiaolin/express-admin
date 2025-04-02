const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("gh-express-db", "root", "123456", {
    host: "localhost",
    dialect: "mysql",
    port: "3306",
    timezone: "+08:00", //东八时区
    pool: {
        max: 5, //最大连接数量
        min: 0, //最小连接数
        idle: 10000, //若某个线程10秒没有使用，就释放
    },
    debug: true, //显示调试信息
    logging(sql) {
        // console.log(sql)
    },
    dialectOptions: {
        charset: 'utf8mb4',
        dateStrings: true,
        typeCast: true,
    },
});

module.exports = sequelize;
