const express = require('express')
const morgan = require('morgan')
const app = express()
let persons = [  
    { id:1, name: 'Arto Hellas', number: '040-123456' },
    { id:2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id:3, name: 'Dan Abramov', number: '12-43-234345' },
    { id:4, name: 'Mary Poppendieck', number: '39-23-6423122' }
]

morgan.token('host', function(req, res) {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :host'))

const Port = 3001
app.listen(Port)
console.log(`server running on port ${Port}`)

app.get('/',(req,res) =>{
    const text = `
        <div>
            <h3>Phonebook has info for ${persons.length}</h3>
            <h3>${new Date()}</h3>
        </div>
    `
    res.send(text)
})

app.get('/api/getall', (req,res) =>{
    res.json(persons)
})

app.get('/api/persons/:id', (req,res) =>{
    const personId = Number(req.params.id)
    const person = persons.find(person => person.id === personId)

    if(person){
        res.json(person)
    }else{
        res.sendStatus(404).end()
    }
})

app.delete('/api/persons/:id', (req,res) =>{
    const personId = Number(req.params.id)
    const foundIndex = persons.findIndex(person => person.id === personId)

    if(foundIndex != -1){
        persons.splice(foundIndex,1)
        console.log(persons)
    }

    res.status(204).end()
})

app.post('/api/persons/', (req,res) =>{
    const body = req.body
    const foundIndex = persons.findIndex( person => person.name === body.name)

    console.log(body)

    if(!body.name || !body.number){
        return res.status(400).json({error: 'name or number is empty'})
    }

    if(foundIndex !== -1){
        return res.status(400).json({error: 'name must be unique'})
    }

    const person = {
        id: Math.floor(Math.random() *1000),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    res.json(persons)
})

app.get('/api/persons', (req,res) =>{
    res.json(persons)
})