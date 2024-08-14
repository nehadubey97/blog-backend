const express = require('express')
const dbconnectkro = require('./config/db')
const dotenv = require('dotenv')
const userRoutes = require('./routes/user')

dotenv.config()

const app = express()
app.use(express.json())

dbconnectkro()

app.use(express.static(__dirname + '/public/'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.use('/users', userRoutes)

app.listen(3000, () => {
  console.log('server connected')
})
