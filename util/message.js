// 成功消息提示
global.successMsg = (data,msg = '查询成功!',params) => {
    return {
        data: data,
        code: 200,
        msg: msg,
        ...params
    }
}
// 错误消息提示
global.errorMsg = (msg = '系统错误',data = null,code = 500)=>{
    return {
        data: data,
        code: code,
        msg: msg
    }
}