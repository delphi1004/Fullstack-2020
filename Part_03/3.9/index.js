const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('host', function(req, res) {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :host'))

const Port = process.env.PORT || 3001
app.listen(Port)
console.log(`server running on port ${Port}`)

const persons = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

 app.get('/api/persons', (req,res) =>{
    res.json(persons)
})