// 文件方法
const FileModel = require('../model/file');
const fs = require('fs');            // 文件模块
const { sendMail } = require('../plugin/sendmail.js')
module.exports = {
    // 文件上传
    async uploadFile(req, res, next){
        try {
            const files = req.files
            let data = []
            files.map(item => {
                data.push({
                    name: item.originalname,
                    filename: item.filename,
                    type: item.mimetype,
                    size: item.size,
                    suffix: item.originalname.split('.')[1],
                    path: item.path.replace('\\','/')
                })
            })
            const result = await FileModel.bulkCreate(data,{ validate: true });
            res.send(successMsg(result,'上传成功!'))
        } catch (error) {
            next(error)
        }
    },
    // 删除文件-根据id删除
    async deleteFile(req, res, next){
        try {
            const { id } = req.query;
            await FileModel.findOne({
                where: {id}
            }).then(result => {
                if(result){
                    try {
                        // 判断文件是否能被读取，可读取删除物理文件，不可读取只删除数据表的数据
                        if(fs.existsSync(result.dataValues.path)){
                            fs.unlinkSync(result.dataValues.path);
                            const file = FileModel.destroy({
                                where: { id },
                            });
                            res.send(successMsg(file, "删除成功!"));
                        }else{
                            const file = FileModel.destroy({
                                where: { id },
                            });
                            res.send(successMsg(file, "删除成功!"));
                        }
                    } catch (error) {
                        res.send(errorMsg(error));
                    }
                }else{
                    res.send(errorMsg("删除失败,未查询到该数据!"));
                }
            })
        } catch (error) {
            next(error)
        }
    },
    // 发送邮件
    async sendMail(req, res, next){
        try {
            let {name,to,subject,html} = req.body
            let messageId = sendMail({name,to,subject,html})
            res.send(successMsg(messageId,'发送邮件成功!'));
        } catch (error) {
            next(error)
        }
    }
}