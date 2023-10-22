const express = require('express');
const cors = require('cors')
const { errorHandler } = require('./middleware/errorHandler');
const CustomError = require('./utils/customError');
const authRouter = require('./routers/auth.route');
const taskRouter = require('./routers/task.route');

const app = express();

app.use(express.json())
app.use(cors())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/task', taskRouter)


app.all('*', (req, res, next) => {
    next(new CustomError(`${req.originalUrl} is not found`, 404))
})

app.use(errorHandler)


module.exports = app;