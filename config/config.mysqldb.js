// mysql数据库配置
const mysql = require('mysql')
module.exports = {
    // 数据库连接池
    sqldb(sql,sqlParams){
        return new Promise((resolve, reject) => {
            // 数据库连接配置
            let pool = mysql.createPool({
                host: 'localhost',
                user: 'root',
                password: '12356',
                port: '3306',
                database: 'gh-express-db'
            })
            pool.getConnection((err,conn) => {
                if(err){
                    console.log('mysql数据库连接失败!')
                    return;
                }
                // 事件驱动
                conn.query(sql, sqlParams, (e,result) => {
                    if(!e){
                        resolve(result)
                        conn.destroy()
                    }else{
                        console.log('sql',e)
                        reject(e)
                    }
                })
            })
        })
    }
}