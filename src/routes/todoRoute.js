const express = require('express');
const Todo = require('../models/todoModel');

const todoRoute = express.Router();

// Rota para criar uma nova tarefa
todoRoute.post('/create', async (req, res) => {
    try {
        const { userId, title, description, dueDate } = req.body;

        const newTodo = new Todo({
            userId,
            title,
            description,
            dueDate,
        });

        const savedTodo = await newTodo.save();

        res.json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para recuperar todas as tarefas de um usuário específico
todoRoute.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const todos = await Todo.find({ userId });

        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para atualizar o estado de uma tarefa (marcar como concluída, por exemplo)
todoRoute.patch('/update/:todoId', async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const { completed } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(todoId, { completed }, { new: true });

        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para apagar uma tarefa
todoRoute.delete('/delete/:todoId', async (req, res) => {
    try {
        const todoId = req.params.todoId;

        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (deletedTodo) {
            res.json({ message: 'Tarefa removida com sucesso.' });
        } else {
            res.status(404).json({ message: 'Tarefa não encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = todoRoute;
