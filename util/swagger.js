const path = require("path");
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");
//配置swagger-jsdoc
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "express后台管理系统",
            version: "1.0.0",
            description: ``,
        },
    },
    //去哪个路由下收集swagger注释
    apis: ["../router/*.js"],
};
var swaggerJson = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerspec);
};
const swaggerspec = swaggerDoc(options);
var swaggerInstall = function (app) {
    if (!app) {
        app = express();
    }
    app.get("/swagger.json", swaggerJson);
    //使用swaggerSpec生成swagger文档页面，并开放在指定路由
    app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerspec));
};
module.exports = swaggerInstall;
