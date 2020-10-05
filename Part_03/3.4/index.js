const express = require('express')
const app = express()
let persons = [  
{ id:1, name: 'Arto Hellas', number: '040-123456' },
{ id:2, name: 'Ada Lovelace', number: '39-44-5323523' },
{ id:3, name: 'Dan Abramov', number: '12-43-234345' },
{ id:4, name: 'Mary Poppendieck', number: '39-23-6423122' }
]

app.use(express.json())

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

app.get('/api/persons', (req,res) =>{
    res.json(persons)
})