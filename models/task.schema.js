const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: [true, 'task name is required']
    },
    description: String,
    
})