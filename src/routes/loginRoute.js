const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cadastro = require('../models/cadastroModel');

const loginRouter = express.Router();

loginRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {

        // Verifica se o usuário existe no banco de dados
        const user = await Cadastro.findOne({ email });

        if(!user) {
            return res.status(404).json({ message: "Usuário não encontrado."});
        }

        // Verificar se a senha está correta
        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch) {
            return res.status(401).json({ message: "Senha incorreta."})
        }

        // Gerar token JWT
        const token = jwt.sign({ userId: user._id, email: user.email }, 'MinhaChaveSecreta', { expiresIn: '1h'})

        // Login bem sucedido
        res.status(200).json({ token })
    } catch (error) {
        console.error('Erro durante o login:', error.message);
        res.status(500).json({ message: "Erro durante o login."});
    }
});

module.exports = loginRouter;