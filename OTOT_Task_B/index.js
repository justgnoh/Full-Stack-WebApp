const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 6969

const db = require('./queries')

app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/getAllUsers', db.getUsers)
app.get('/getUser/:id', db.getUserById)
app.post('/users/', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

module.exports = app;