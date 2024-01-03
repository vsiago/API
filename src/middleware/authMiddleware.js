const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function verificarToken(req, res, next) {
    const tokenHeader = req.headers.authorization;

    if(!tokenHeader) {
        return res.status(401).json({ message: "Token não fornecido."});
    }

    // Remova a parte "Bearer " do token
    const token = tokenHeader.split(' ')[1];

    // const chaveSecreta = crypto.randomBytes(32).toString('hex');

    jwt.verify(token, 'MinhaChaveSecreta', (err, decoded) => {
        if(err) {
            console.error(err);
            return res.status(401).json({ message: "Token inválido." });
        }


        req.usuario = decoded;
        next();
    })
}

module.exports = verificarToken;