const app = require('./server/server')
const connectDB = require('./server/db')

app.listen(3131, () => {
    console.log('App rodando na porta 3131')
})

connectDB();