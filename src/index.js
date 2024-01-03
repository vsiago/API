const app = require('./server/server')
const connectDB = require('./server/db')

app.listen(3000, () => {
    console.log('App rodando na porta 3000')
})

connectDB();