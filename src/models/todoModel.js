const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        red: 'Cadastro',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo