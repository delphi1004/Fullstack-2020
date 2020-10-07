const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide at least the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://delphi1004:${password}@cluster0.3nsm8.mongodb.net/persons?retryWrites=true&w=majority`
const noteSchema = new mongoose.Schema({
      name: String,
      phone: String
})

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const Person = mongoose.model('person', noteSchema)

if(process.argv.length === 3){
    console.log('Phone book excercise 3.12')
    console.log('----------------------------')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name,person.phone)
        })
        mongoose.connection.close()
        console.log('----------------------------')
    })
}else{
    const personName = process.argv[3]
    const personPhone = process.argv.length > 4 ? process.argv[4] : 'empty'
    const person = new Person({
        name: personName,
        phone: personPhone
    })

    person.save().then(result => {
        console.log(`added ${personName} number ${personPhone} to phonebook`)
        mongoose.connection.close()
    })
}