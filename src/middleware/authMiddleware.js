const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const token = req.headers.autorization;

    console.log(token)

    if(!token) {
        return res.status(401).json({ message: "Token não fornecido."});
    }

    jwt.verify(token, 'awrgb24Yçoaih4uy24SDBNESJhç4GNH98hgbOWIVNOÇJH4GÇO42GHVJÇOwhbH4', (err, decoded) => {
        if(err) {
            return res.status(401).json({ message: "Token inválido."});
        }

        req.usuario = decoded;
        next();
    })
}

module.exports = verificarToken;