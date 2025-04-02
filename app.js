const express = require("express");
const path = require("path"); // path模块
const morgan = require("morgan"); // 日志中间件
const cors = require("cors"); // 处理跨域中间件
const { expressjwt } = require("express-jwt"); // 鉴权
const { urlList } = require("./router/white");
const router = require("./router");
const errorHandler = require("./middleware/error-handler"); // 统一错误处理
const { secretKEY, apiPrefix } = require("./config/config.default"); // 配置文件
const { getLocalIP } = require("./util/index"); // 工具类
require("./util/message"); // 返回消息格式
// const swaggerInstall = require('./util/swagger') // swagger文档
const app = express();
// 注册swagger
// swaggerInstall(app)
// 日志输入
app.use(morgan("dev"));
// 解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 处理跨域中间件
app.use(cors());
// 上传文件可访问权限
app.use("/upload", express.static(path.join(__dirname, "/upload")));
// 注册微信web网页开发api
const weixinWebApi = require("./plugin/weixin-webapi/index");
app.use(weixinWebApi);
// JWT鉴权
app.use(
    expressjwt({
        secret: secretKEY, // 密钥
        algorithms: ["HS256"],
    }).unless({ path: urlList })
);

const port = process.env.PORT || 3000;
// 挂载路由
app.use(apiPrefix, router);
// 挂载统一处理服务端错误中间件
app.use(errorHandler());
app.listen(port, () => {
    console.log(
        `********服务启动********
    http://localhost:${port}
    http://127.0.0.1:${port}
    http://${getLocalIP()}:${port}
************************`
    );
});
