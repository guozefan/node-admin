var UserService = require('../services/user')
var db = require('../config/db')
const JWT = require('../utils/JWT')

const user = {
    login: async (req, res, next) => {
        const {
            userName,
            passWord
        } = req.body
        console.log(userName, passWord)
        var sql = 'select * from user where userName = ? and passWord = ?';
        var sqlArr = [userName, passWord];
        var callBack = (err, data) => {
            if (err) {
                res.send({
                    code: '99',
                    msg: err
                })
            } else {
                const datas = {
                    ...data[0]
                }
                if (JSON.stringify(datas) === '{}') {
                    res.send({
                        code: '2',
                        msg: '用户名或密码不匹配'
                    })
                    return
                }
                const token = JWT.generate(datas, '1d')
                console.log(datas, token)
                res.send({
                    code: '0',
                    msg: {
                        token,
                        userInfo: datas
                    }
                })
            }
        }
        db.sqlConnect(sql, sqlArr, callBack)
    }
}
module.exports = user