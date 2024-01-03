const express = require("express");
const cadastroRouter = require('../routes/cadastroRoute');
const loginRouter = require('../routes/loginRoute');
const verificarToken = require('../middleware/authMiddleware');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

// Uso de rotas
app.use('/api', cadastroRouter);
app.use('/api', loginRouter);

// Rota protegida
app.get('/api/dashboard', verificarToken, (req, res) => {
    // req.usuario contém as informações do usuário decodificadas a partir do token
    res.json({ message: "Rota protegida!", user: req.usuario})
})

module.exports = app
