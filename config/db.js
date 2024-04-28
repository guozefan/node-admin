const mysql = require('mysql');
module.exports = {
    config: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'test',
        port: '3306'
    },
    sqlConnect:function(sql,sqlArr,callBack){
        var pool = mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            console.log('12345')
            if(err){
                console.log('连接失败')
                return;
            }

            // 事件驱动回调
            conn.query(sql,sqlArr,callBack)
            // 释放连接
            conn.release()
        })
    }
}