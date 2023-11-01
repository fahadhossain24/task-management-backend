const express = require('express');
const taskController = require('../controllers/task.controller');

const taskRouter = express.Router();

taskRouter.route('/')
    .post(taskController.saveTask)
    .get(taskController.getTasks)

taskRouter.route('/:id')
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask)

module.exports = taskRouter;