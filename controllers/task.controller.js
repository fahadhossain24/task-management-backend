const taskServices = require("../services/task.service");
const CustomError = require("../utils/customError");

exports.saveTask = async (req, res, next) => {
    try {
        const taskInfo = req.body;
        const task = await taskServices.saveTaskService(taskInfo);
        if (!task._id) {
            const error = new CustomError('task not created', 400);
            next(error);
        }

        res.status(200).json({
            status: 'success',
            message: 'task successfully created',
            data: task,
        })

    } catch (error) {
        const err = new CustomError(error.message, 400);
        next(err);
    }
}

exports.getTasks = async (req, res, next) => {
    try {

        let filteredQuery = {...req.query};
        if (req.query) {
            const excludedProperties = ["page", "limit"];
            filteredQuery = Object.keys(filteredQuery).filter(key => !excludedProperties.includes(key)).reduce((obj, key) => {
                obj[key] = filteredQuery[key];  
                return obj
            }, {})
        }

        const { page = 1, limit = 12 } = req.query
        const skip = (page - 1) * limit

        const tasks = await taskServices.getTasksService(filteredQuery, skip, limit);
        const allTask = await taskServices.getAllTaskService();
        const totalPages = Math.ceil(allTask.length / limit)
        if (tasks.length === 0) {
            const error = new CustomError('tasks not found', 400);
            next(error);
        }


        res.status(200).json({
            status: 'success',
            message: 'Tasks retirved successfully',
            data: {
                tasks,
                totalPages
            },
        })

    } catch (error) {
        const err = new CustomError(error.message, 400);
        next(err);
    }
}


// update a task
exports.updateTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await taskServices.updateTaskService(id, req.body);
        if (!result.modifiedCount) {
            const error = new CustomError("Can't update task", 401);
            next(error);
        }

        res.status(200).json({
            status: 'success',
            message: 'task updated successfull',
            task: result,
        })

    } catch (error) {
        const err = new CustomError(error.message || error, 404);
        next(err);
    }
}

// delete a task
exports.deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await taskServices.deleteTaskService(id);
        if (!result.deletedCount) {
            const error = new CustomError("Can't delete task");
            next(error);
        }
        res.status(200).json({
            status: 'success',
            message: 'delete successfull',
            data: result,
        })
    } catch (error) {
        const err = new CustomError(error.message || error, 404);
        next(err);
    }
}