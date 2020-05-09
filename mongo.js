const mongoose = require('mongoose')
const password = process.argv[2]
const nameArg = process.argv[3]
const numberArg = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-6ztpj.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// DB Handling Functions

const findAllPeopleAndReturn = () => {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
        process.exit(1)
      })
}

const saveNewPersonToDB = (name, number) => {
    const person = new Person({
        name: name,
        number: number,
      })
      
      person.save().then(response => {
        console.log('person saved!')
        mongoose.connection.close()
      }).catch((error) => {
          console.log('there was a problem')
      })
} 

// Handling logic

if ( process.argv.length < 3 ) {
    console.log('supply program input.', 'order of input is yourpassword, new name, new number')
    process.exit(1)
}

if ( process.argv.length < 4 ) {
    findAllPeopleAndReturn()
}

if ( process.argv.length < 6 ) {
    saveNewPersonToDB(nameArg, numberArg)
}

