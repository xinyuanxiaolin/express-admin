/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
exports.filterObj = (obj) => {
    if (!(typeof obj == "object")) {
        return;
    }
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && (obj[key] == null || obj[key] == undefined || obj[key] === "")) {
            delete obj[key];
        }
    }
    return obj;
};
/**
 * 深拷贝
 * @param {Object} source
 * @returns {Object}
 */
exports.deepClone = (source) => {
    if (!source && typeof source !== "object") {
        throw new Error("error arguments", "deepClone");
    }
    const targetObj = source.constructor === Array ? [] : {};
    Object.keys(source).forEach((keys) => {
        if (source[keys] && typeof source[keys] === "object") {
            targetObj[keys] = deepClone(source[keys]);
        } else {
            targetObj[keys] = source[keys];
        }
    });
    return targetObj;
};
/**
 * 递归查询树结构
 * @param {Array} data  原始数据
 * @returns {Array}
 */
exports.recursionTree = (data) => {
    let result = [];
    for (const vi of data) {
        if (vi.parent_id === "0") {
            let obj = {
                ...vi.dataValues,
            };
            obj["children"] = childsTree(vi.id, data);
            result.push(obj);
        }
    }
    return result;
    // 递归子节点
    function childsTree(id, array) {
        const childs = [];
        for (const cvi of array) {
            if (cvi.parent_id === id) {
                childs.push(cvi.dataValues);
            }
        }
        for (const ccvi of childs) {
            const childsV = childsTree(ccvi.id, array);
            if (childsV.length > 0) {
                ccvi.children = childsV;
            }
        }
        return childs;
    }
};
/**
 * 获取本机ip地址
 */
exports.getLocalIP = () => {
    const os = require("os");
    const osType = os.type(); //系统类型
    const ifaces = os.networkInterfaces(); //网络信息
    let locatIp = "";
    for (let dev in ifaces) {
        //console.log(dev)   //打印看结果
        if (dev === "本地连接" || dev === "以太网" || dev === "WLAN") {
            for (let j = 0; j < ifaces[dev].length; j++) {
                if (ifaces[dev][j].family === "IPv4") {
                    locatIp = ifaces[dev][j].address;
                    break;
                }
            }
        }
    }
    return locatIp;
};
