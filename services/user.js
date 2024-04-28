const userModel = require('../models/user')
const UserService = {
    login: async (res) => {
        return userModel.login(res)
    }
}

module.exports = UserService