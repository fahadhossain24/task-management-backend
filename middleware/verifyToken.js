const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customError');
const {promisify} = require('util');

exports.verifyToken = async(req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            const error = new CustomError('You are not loged in. login first', 403);
            next(error)
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_TOKEN_SECRET)

        req.user = decoded;
        next()

    } catch (error) {
        const err = new CustomError('invalid token', 403);
        next(err)
    }
}