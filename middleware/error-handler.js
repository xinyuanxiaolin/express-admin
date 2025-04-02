// 处理服务端错误
const util = require('util')
module.exports = () => {
    return (err, req, res, next) => {
        console.log(err)
        let {status,name} = err
        if(status == 401&&name == "UnauthorizedError"){
            res.send(errorMsg('登陆状态失效,请重新登录!',null,401))
        }else{
            res.send(errorMsg('系统错误',err))
        }   
    }
}