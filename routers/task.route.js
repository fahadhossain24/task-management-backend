const express = require('express');
const taskController = require('../controllers/task.controller');

const taskRouter = express.Router();

taskRouter.route('/')
    .post(taskController.saveTask)
    .get(taskController.getTasks)

module.exports = taskRouter;