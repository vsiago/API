const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function verificarToken(req, res, next) {
    const token = req.headers.authorization;

    console.log(token)

    if(!token) {
        return res.status(401).json({ message: "Token não fornecido."});
    }

    const chaveSecreta = crypto.randomBytes(32).toString('hex');

    jwt.verify(token, 'MinhaChaveSecreta', (err, decoded) => {
        if(err) {
            return res.status(401).json({ message: "Token inválido."});
        }

        req.usuario = decoded;
        next();
    })
}

module.exports = verificarToken;