
const devErrorResponse = (error, res) => {
    console.log(error)
    res.status(error.statusCode).json({
        status: error.status,
        error: error.message,
        errorObject: error,
    })
}

const prodErrorResponse = (error, res) => {
        res.status(error.statusCode).json({
            status: error.status,
            error: error.message,
        })
}

exports.errorHandler = (error, req, res, next) => {

    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'server error';

    if(process.env.NODE_ENV.trim() === 'development'){
        devErrorResponse(error, res)
    }else if(process.env.NODE_ENV.trim() === 'production'){
        prodErrorResponse(error, res)
    }
}