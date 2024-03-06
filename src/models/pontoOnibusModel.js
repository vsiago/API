const mongoose = require('mongoose');

const pontosOnibusSchema = new mongoose.Schema({
  rota: String,
  numero_ponto: Number,
  latitude: Number,
  longitude: Number,
  data_criacao: Date,
});

module.exports = mongoose.model('PontoOnibus', pontosOnibusSchema);