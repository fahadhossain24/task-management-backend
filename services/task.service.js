const Task = require("../models/task.schema")

exports.saveTaskService = async (data) => {
    const result = await Task.create(data);
    return result;
}

exports.getTasksService = async (filteredQuery, skip, limit) => {
    const result = await Task.find(filteredQuery).skip(skip).limit(limit);
    return result;
}
exports.getAllTaskService = async () => {
    const result = await Task.find({});
    return result;
}

exports.updateTaskService = async (id, data) => {
    const result = await Task.updateOne({ _id: id }, data, {
        runValidators: true,
    });
    return result;
}

exports.deleteTaskService = async (id) => {
    const result = await Task.deleteOne({ _id: id });
    return result;
}