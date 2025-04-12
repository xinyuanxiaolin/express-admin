// 默认配置
module.exports = {
    // 接口前缀
    apiPrefix: "/api",
    // 令牌key
    secretKEY: "Zeratul",
    // 过期时间
    expiresIn: "7d",
    // 开启数据表同步
    tableSync: true,
    // 邮件配置 POP3/SMTP服务
    mail: {
        host: "smtp.qq.com",
        user: "",
        pass: "",
    },
};
