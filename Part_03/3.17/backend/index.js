require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

function InitRestAPI() {

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

        person.save().then(savedPerson => { res.json(savedPerson) })
    })

    app.put('/api/persons/:id', (request, response) => {

        const body = request.body

        const person = {
            name: body.name,
            number: body.number,
        }

        Person.findByIdAndUpdate(request.params.id, person)
            .then(updatedPerson => {
                response.json(updatedPerson)
            })
            .catch(error => next(error))
    })

    app.delete('/api/persons/:id', (request, response, next) => {
        Person.findByIdAndRemove(request.params.id)
            .then(result => {
                console.log(result)
                response.status(204).end()
            })
            .catch(error => { next(error) })
    })
}

function InitErrorHandler() {

    const unknownEndpoint = (request, response) => {
        response.status(404).send({ error: 'unknown endpoint' })
    }

    const errorHandler = (error, request, response, next) => {
        console.error(error.name)

        if (error.name === 'CastError') {
            return response.status(400).send({ error: 'malformatted id' })
        }

        next(error)
    }

    app.use(unknownEndpoint)
    app.use(errorHandler)
}

function startServer() {

    morgan.token('host', function (req, res) {
        return JSON.stringify(req.body)
    })

    app.use(cors())
    app.use(express.json())
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :host'))

    InitRestAPI()
    InitErrorHandler()

    const Port = process.env.PORT | 3001
    app.listen(Port)
    console.log(`server running on port ${Port}`)
}

startServer()