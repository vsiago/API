const express = require('express');
const bcrypt = require('bcrypt');
const Cadastro = require("../models/cadastroModel")

const cadastroRouter = express.Router();

cadastroRouter.post('/cadastro', async (req, res) => {
    const { username, email, password, name } = req.body;

    // Validações assincronas
    try {
        const existingUser = await Cadastro.findOne({ $or: [{ username }, { email }] });

        if(existingUser) {
            return res.status(400).json({ message: "Usuário ou email já existente."})
        }

        // Hash da senha antes de armazenar no banco de dados
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar um novo usuário
        const novoCadastro = new Cadastro({
            username,
            email,
            password: hashedPassword,
            name
        });

        // Salvar no banco de dados
        await novoCadastro.save()

        res.status(201).json({ message: "Cadastro bem-sucedido."})
    } catch (error) {
        console.error('Erro durante o cadastro', error.message);
        res.status(500).json({ message: "Erro durante o cadastro."})
    }
})

module.exports = cadastroRouter;