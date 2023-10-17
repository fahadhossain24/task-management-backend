const User = require("../models/user.schema")

exports.signup = async(data) => {
    const result = await User.create(data)
    return result
}
exports.getUserByToken = async(token) => {
    const result = await User.findOne({verifyToken: token})
    return result
}

exports.getUserByEmail = async(email) => {
    const result = await User.findOne({email})
    return result
}

exports.getUserByEmailService = async(email) => {
    const result = await User.findOne({email})
    return result
}
