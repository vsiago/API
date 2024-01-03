const mongoose = require('mongoose');

const uri = 'mongodb+srv://vsiago21:qF7ZxJrW5Az7cHPf@cluster0.wp8xul2.mongodb.net/oplan'


const connectDB = async () => {
    try {
        await mongoose.connect(uri)
        console.log('Conexão com o MongoDB Atlas estabelecida com sucesso!');
    } catch (error) {
        console.error('Error ao conectar ao MongoDB Atlas', error.message);
        process.exit(1)
    }
}

module.exports = connectDB