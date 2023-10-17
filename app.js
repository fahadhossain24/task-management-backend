const express = require('express');
const { errorHandler } = require('./middleware/errorHandler');
const CustomError = require('./utils/customError');
const authRouter = require('./routers/auth.route');

const app = express();

app.use(express.json())

app.use('/api/v1/auth', authRouter)


app.all('*', (req, res, next) => {
    next(new CustomError(`${req.originalUrl} is not found`, 404))
})

app.use(errorHandler)


module.exports = app;