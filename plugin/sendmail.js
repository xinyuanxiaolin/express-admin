/**
 * 发送邮件
 */
const nodemailer = require("nodemailer");
const { mail } = require('../config/config.default')   // 配置文件
// 发送邮件
exports.sendMail = async (sendInfo) => {
    let transporter = nodemailer.createTransport({
        host: mail.host,
        port: 587,
        secure: false ,
        auth: {
            user: mail.user,
            pass: mail.pass,
        },
    });
    let { name,to,subject,html } = sendInfo
    let info = await transporter.sendMail({
        from: `"${name}" <${mail.user}>`, // 发件人
        to: to, // 接收列表
        subject: subject, // 邮件标题
        html: html, // 邮件内容
    });
    console.log(info.messageId)
};
