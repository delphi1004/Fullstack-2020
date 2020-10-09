require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

function InitRestAPI() {

    app.get('/api/persons', (req, res, next) => {
        Person.find({})
            .then(persons => { res.json(persons) })
            .catch(error => { next(error) })
    })

    app.get('/api/persons/:id', (req, res, next) => {

        Person.findById(req.params.id)
            .then(person => person.toJSON())
            .then(FormattedPerson => { res.json(FormattedPerson) })
            .catch(error => { next(error) })
    })

    app.post('/api/persons', (req, res, next) => {
        const body = req.body

        if (body === undefined) {
            return res.status(400).json({ error: 'content missing' })
        }

        Person.findOne({ name: body.name })
            .then((personFound) => {
                if (personFound === null) {
                    const newPerson = Person({
                        name: body.name,
                        number: body.number
                    })
                    newPerson.save()
                        .then(savedPerson => savedPerson.toJSON())
                        .then(SavedAndFormattedPerson => { res.json(SavedAndFormattedPerson) })
                        .catch(error => { next(error) })
                } else {
                    res.status(400).json({ error: `Person ${body.name} is already saved` })
                }
            })
            .catch(error => { next(error) })
    })

    app.put('/api/persons/:id', (req, res, next) => {

        const body = req.body

        const person = {
            name: body.name,
            number: body.number,
        }

        console.log(person)

        Person.findByIdAndUpdate(req.params.id, person , { runValidators: true })
            .then(updatedPerson => updatedPerson.toJSON())
            .then(SavedAndUpdatedPerson => { res.json(SavedAndUpdatedPerson) })
            .catch(error => { next(error) })
    })

    app.delete('/api/persons/:id', (req, res, next) => {
        Person.findByIdAndRemove(req.params.id)
            .then(result => {
                console.log(result)
                res.json(result)
            })
            .catch(error => { next(error) })
    })
}

function InitErrorHandler() {

    const unknownEndpoint = (req, res) => {
        res.status(404).send({ error: 'unknown endpoint' })
    }

    const errorHandler = (error, req, res, next) => {
        console.error(error.message)

        if (error.name === 'CastError') {
            return res.status(400).send({ error: 'malformatted id' })
        } else if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message })
        }

        next(error)
    }

    app.use(unknownEndpoint)
    app.use(errorHandler)
}

function startServer() {

    // eslint-disable-next-line no-unused-vars
    morgan.token('host', function (req, res) {
        return JSON.stringify(req.body)
    })

    app.use(cors())
    app.use(express.static('build'))
    app.use(express.json())
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :host'))

    InitRestAPI()
    InitErrorHandler()

    // eslint-disable-next-line no-undef
    const Port = process.env.PORT || 3001
    app.listen(Port)
    console.log(`server running on port ${Port}`)
}

startServer()