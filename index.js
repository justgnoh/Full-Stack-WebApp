const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 6969

const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// app.get('/styles', db.getStyles)

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

// TODO: Enable below when running npm test

module.exports = app;