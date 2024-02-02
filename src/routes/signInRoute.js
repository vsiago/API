const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cadastro = require("../models/cadastroModel");

const signInRoute = express.Router();

signInRoute.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe no banco de dados
    const user = await Cadastro.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Verificar se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    // Login bem sucedido - retorna o objeto completo do usuário
    res.status(200).json({
      userId: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      // Adicione outros campos conforme necessário

      token: jwt.sign(
        {
          userId: user._id,
          username: user.username,
          email: user.email,
          name: user.name,
        },
        "MinhaChaveSecreta",
        { expiresIn: "10m" }
      ),
    });
  } catch (error) {
    console.error("Erro durante o login:", error.message);
    res.status(500).json({ message: "Erro durante o login." });
  }
});

signInRoute.get("/listar-usuarios", async (req, res) => {
  try {
    // Certifique-se de que a rota só seja acessível por usuários autenticados (com um token válido)
    const usuarios = await Cadastro.find({}, { password: 0 }); // O segundo argumento ({ password: 0 }) exclui a senha da resposta

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários:", error.message);
    res.status(500).json({ message: "Erro ao listar usuários." });
  }
});

module.exports = signInRoute;
