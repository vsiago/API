const mongoose = require('mongoose');

const cadastroSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
      }
});

const Cadastro = mongoose.model('Cadastro', cadastroSchema)
module.exports = Cadastro;