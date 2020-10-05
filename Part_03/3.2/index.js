const express = require('express')
const app = express()
const persons = [  
{ id:1, name: 'Arto Hellas', number: '040-123456' },
{ id:2, name: 'Ada Lovelace', number: '39-44-5323523' },
{ id:3, name: 'Dan Abramov', number: '12-43-234345' },
{ id:4, name: 'Mary Poppendieck', number: '39-23-6423122' }
]

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

app.get('/api/persons', (req,res) =>{
    res.json(persons)
})