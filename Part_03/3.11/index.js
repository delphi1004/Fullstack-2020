const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('host', function (req, res) {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :host'))

const Port = process.env.PORT || 3001
app.listen(Port)
console.log(`excercise 3.11 server running on port ${Port}`)

let persons = [
    { id: 0, name: 'Arto Hellas', number: '040-123456' },
    { id: 1, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 2, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 3, name: 'Mary Poppendieck', number: '39-23-6423122' }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const foundId = persons.findIndex(person => person.id === id)

    if (foundId != -1) {
        const deletedPerson = persons.find(person => person.id === id)
        persons.splice(foundId, 1)
        res.json(deletedPerson)
        console.log(deletedPerson)
    }
    
    res.status(204).end()
})

const GenerateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0
    return maxId + 1
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({ error: 'name is empty' })
    }

    const person = {
        id: GenerateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    res.json(person)
})
