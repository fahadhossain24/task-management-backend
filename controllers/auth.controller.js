const bcryptjs = require('bcryptjs');
const CustomError = require("../utils/customError")
const authServices = require('../services/auth.service');
const { generateToken } = require("../utils/jwtToken");
const sendEmail = require("../utils/sendMail");


exports.signup = async (req, res, next) => {
    try {
        const user = await authServices.signup(req.body);
        if (!user._id) {
            return next(new CustomError('user can\'t create', 400))

        }

        const verificationtToken = await user.verificationToken()
        await user.save({ validateBeforeSave: false })

        // send verification mail 
        const info = await sendEmail(
            user.email,
            'Verify your account',
            `
            click this link to verify your account
            <a href='${req.protocol}://${req.get('host')}${req.originalUrl}/verification/${verificationtToken}'>click</a>
            `
        );

        if (!info.messageId) {
            console.log('email not sent')
        }

        const { password, ...userInfo } = user.toObject();

        res.status(200).json({
            status: 'success',
            message: 'successfully sign up',
            data: userInfo,
        })
    } catch (error) {
        next(new CustomError(error.message, 400))
    }
}

exports.emailConfirmation = async (req, res, next) => {
    const token = req.params.token;
    const user = await authServices.getUserByToken(token);
    if (!user) {
        const error = new CustomError('invalid token, send request again')
        return next(error);
    }

    const expried = new Date() > new Date(user.verifyTokenExpiresDate)
    if (expried) {
        const error = new CustomError('token expired. send new request')
        return next(error);
    }

    user.verified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiresDate = undefined;

    await user.save({ validateBeforeSave: false })

    res.send('Verification Done');
}


exports.getUser = async (req, res, next) => {
    try {
        const { email } = req.user;
        const user = await authServices.getUserByEmail(email);
        if (!user) {
            const error = new CustomError('user not found', 404);
            return next(error);
        }

        const { password, ...userWithoutPassword } = user.toObject();

        res.status(200).json({
            status: 'success',
            message: 'user founded',
            data: userWithoutPassword,
        })
    } catch (err) {
        const error = new CustomError(err.message, 400);
        next(error)
    }
}


// login.............
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authServices.getUserByEmailService(email);
        // check the user is exist
        if (!user) {
            const error = new CustomError('User not found, sign up first', 404)
            return next(error)
        }

        // compare user password
        const isValidPassword = bcryptjs.compareSync(password, user.password);

        if (!isValidPassword) {
            const error = new CustomError('invalid email or password, try currect', 400)
            return next(error)
        }


        // check if the user is verified
        // if(user.verified !== true){
        //     const error = new CustomError('You are not verified, please verify your account', 403)
        //     next(error)
        // }

        // call the generate token function for create a token
        const token = generateToken(user);

        const { password: pwd, ...userInfo } = user.toObject();

        res.status(200).json({
            status: 'success',
            message: 'successfully login',
            data: {
                userInfo,
                token
            },
        })
    } catch (error) {
        next(new CustomError(error.message, 400))
    }
}