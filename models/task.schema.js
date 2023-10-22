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
        },
        default: 'low',
    },
    deadline: Date,
    taskReminder: {
        type: String,
        enum: {
            values: ['true', 'false']
        },
        default: 'false',
    },
    taskVisibility: {
        type: String,
        enum: {
            values: ['private', 'public']
        },
        default: 'private',
    },
    taskRecurring: {
        type: String,
        enum : {
            values: ['deaily', 'weekly', 'monthly', 'yearly']
        },
        default: 'deaily',
    },
    taskStatus: {
        type: String,
        enum: {
            values: ['new', 'in-progress', 'complete', 'cancelled'],
        },
        default: 'new'
    }
    
})


const Task = mongoose.model('Task', taskSchema);


module.exports = Task;