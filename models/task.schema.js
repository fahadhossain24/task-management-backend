const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    taskName: {
        type: String,
        trim: true,
        require: [true, 'task name is required']
    },
    description: String,
    priority: {
        type: String,
        enum: {
            values: ['low', 'high']
        }
    },
    deadline: Date,
    taskReminder: {
        type: String,
        enum: {
            values: ['true', 'false']
        }
    },
    taskVisibility: {
        type: String,
        enum: {
            values: ['onlyMe', 'teamMembers']
        }
    },
    taskRecurring: {
        type: String,
        enum : {
            values: ['deaily', 'weekly', 'monthly', 'yearly']
        }
    }
    
})


const Task = mongoose.model('Task', taskSchema);


module.exports = Task;