const express = require('express');
const PontoOnibus = require('../models/pontoOnibusModel'); // Importe o modelo corretamente

const pontosOnibus = express.Router();

// Rota para criar um novo ponto de ônibus
pontosOnibus.post('/pontos-onibus', async (req, res) => {
    try {
        const novoPonto = new PontoOnibus(req.body); // Cria um novo ponto de ônibus com os dados do corpo da requisição
        const pontoSalvo = await novoPonto.save(); // Salva o novo ponto de ônibus no banco de dados
        res.status(201).json(pontoSalvo); // Retorna o ponto de ônibus recém-criado
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para obter todos os pontos de ônibus
pontosOnibus.get('/pontos-onibus', async (req, res) => {
    try {
        const pontos = await PontoOnibus.find(); // Obtém todos os pontos de ônibus do banco de dados
        res.json(pontos); // Retorna os pontos de ônibus
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = pontosOnibus;