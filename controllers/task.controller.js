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
        const { page = 1, limit = 12 } = req.query
        const skip = (page - 1) * limit
        const tasks = await taskServices.getTasksService(skip, limit);
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