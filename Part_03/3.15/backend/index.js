require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

function startServer() {

    morgan.token('host', function (req, res) {
        return JSON.stringify(req.body)
    })

    app.use(cors())
    app.use(express.json())
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :host'))

    const Port = process.env.PORT | 3001
    app.listen(Port)
    console.log(`server running on port ${Port}`)

    processRestAPI()
}

function processRestAPI() {

    app.get('/api/persons', (req, res) => {
        Person.find({}).then(person => { res.json(person) })
    })

    app.post('/api/persons', (req, res) => {
        const body = req.body

        if (body === undefined) {
            return res.status(400).json({ error: 'content missing' })
        }

        const person = Person({
            name: body.name,
            number: body.number
        })

        person.save().then(savedPerson => {res.json(savedPerson) })
    })

    app.delete('/api/persons/:id', (request, response) => {
        Person.findByIdAndRemove(request.params.id)
          .then(result => {
            console.log(result)
            response.status(204).end()
          })
          .catch(error => {
            console.log(error)
            response.status(404).end()
          })
      })
}

startServer()