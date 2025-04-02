/**
 * 底层运行插件
 */
const { Op } = require("sequelize");
const fs = require("fs");
const { filterObj } = require("../util/index");
/**
 * 创建路由自动生成增删改查接口
 * @param model 模型对象
 * @param extend 扩展对象{暂时未实现}
 */
let routerCreateCrud = (model) => {
    let controller = {
        // 新增
        async add(req, res, next) {
            try {
                const { password } = req.body;
                if (password) {
                    res.send(errorMsg("非法参数!"));
                }else{
                    const result = await model.create(req.body);
                    res.send(successMsg(result, "新增成功!"));
                }
            } catch (error) {
                next(error);
            }
        },
        // 列表
        async list(req, res, next) {
            try {
                let { current, pageSize } = req.query;
                // 对入参进行检测，是否和模型一致
                await model.describe().then(async (data) => {
                    let param = {};
                    for (const key1 in data) {
                        for (const key2 in filterObj(req.query)) {
                            if (key2 == key1) {
                                param[key2] = filterObj(req.query)[key2];
                            }
                        }
                    }
                    let result = {};
                    // 设置分页数量
                    let size = pageSize ? pageSize * 1 : 10;
                    // 传入参数设置成模糊查询
                    let paramWhere = {}
                    for (const key in param) {
                        paramWhere[key] = {
                            [Op.like]: `%${param[key]}%`
                        }
                    }
                    if (current) {
                        result = await model.findAll({
                            where: paramWhere,
                            order: [["createdAt", "DESC"]],
                            offset: (current * 1 - 1) * size,
                            limit: size,
                            attributes: { exclude: ['password'] }
                        });
                        let total = await model.count();
                        res.send(
                            successMsg(result, "查询成功!", {
                                total: total,
                                current: current * 1,
                                pageSize: size,
                            })
                        );
                    } else {
                        result = await model.findAll({
                            where: paramWhere,
                            attributes: { exclude: ['password'] }
                        });
                        res.send(successMsg(result));
                    }
                });
            } catch (error) {
                next(error);
            }
        },
        // 详情
        async detail(req, res, next) {
            try {
                const { id } = req.query;
                const result = await model.findOne({
                    where: { id },
                });
                if (result) {
                    res.send(successMsg(result, "查询成功!"));
                } else {
                    res.send(errorMsg("查询失败,未查询到该数据!"));
                }
            } catch (error) {
                next(error);
            }
        },
        // 编辑
        async edit(req, res, next) {
            try {
                const { id, password } = req.body;
                if (password) {
                    res.send(errorMsg("非法参数!"));
                }
                const result = await model.update(req.body, {
                    where: { id },
                    limit: 1,
                });
                if (result[0] != 0) {
                    res.send(successMsg(result, "编辑成功!"));
                } else {
                    res.send(errorMsg("编辑失败,未查询到该数据!"));
                }
            } catch (error) {
                next(error);
            }
        },
        // 删除
        async delete(req, res, next) {
            try {
                const { id } = req.query;
                if (!id) {
                    res.send(errorMsg("id不能为空!"));
                    return;
                }
                const result = await model.destroy({
                    where: { id },
                });
                if (result != 0) {
                    res.send(successMsg(result, "删除成功!"));
                } else {
                    res.send(errorMsg("删除失败,未查询到该数据!"));
                }
            } catch (error) {
                next(error);
            }
        },
    };
    return controller
};

/**
 * 自动注入控制器与路由进行绑定
 * @param router 路由对象
 * @param whiteList 不进行自动注入的文件
 */
exports.injectControllerRouter = (router,whiteList) => {
    return new Promise((resolve, reject) => {
        fs.readdir('./controller',(err, file) => {
            if(err){
                console.log('读取controller下文件名失败!')
                reject(err)
            }else{
                let files = file.filter(item => !whiteList.includes(item.replace('.js','')))
                let routers = files.map(item => {
                    let fileDir = item.replace('.js','')
                    let createdCrudController = routerCreateCrud(require(`../model/${fileDir}`))
                    router.get(`/${fileDir}/list`, createdCrudController.list);
                    router.get(`/${fileDir}/detail`, createdCrudController.detail);
                    router.post(`/${fileDir}/add`, createdCrudController.add);
                    router.put(`/${fileDir}/edit`, createdCrudController.edit);
                    router.delete(`/${fileDir}/delete`, createdCrudController.delete);
                    return router
                })
                resolve(routers[routers.length - 1])
            }
        })
    })
}