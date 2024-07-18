const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://jassemerivirta:${password}@cluster0.b2qbayi.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (!process.argv[3]) {
  Person.find({}).then(result => {
    console.log('phonebook')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log(`added ${person.name} to phonebook`)
    mongoose.connection.close()
  })
}
