const express = require('express')
const app = express()
app.use(express.json()) // Initialize body parser ---> Untuk menerima request.body dari frontend

const PORT = 5000


app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to Our API</h1>')
})

const { usersRouter } = require("./routers");
app.use('/users', usersRouter)

app.listen(PORT, () => console.log('API Running on Port ' + PORT))