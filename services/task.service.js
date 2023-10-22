const Task = require("../models/task.schema")

exports.saveTaskService = async(data) => {
    const result = await Task.create(data);
    return result;
}

exports.getTasksService = async(skip, limit) => {
    const result = await Task.find({}).skip(skip).limit(limit);
    return result;
}
exports.getAllTaskService = async() => {
    const result = await Task.find({});
    return result;
}