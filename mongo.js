const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
} else if (process.argv.length > 5) {
    console.log("Too many arguments, revise input and retry")
    process.exit(1)
} else if (process.argv.length === 4) {
    console.log("Missing an argument, please revise and retry")
    process.exit(1);
}

const password = process.argv[2]

const url =
`mongodb+srv://fullstack:${password}@cluster0.lvynx.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const person = mongoose.model('person', phonebookSchema)


if (process.argv.length === 3) {
    person.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(entry => {
            console.log(`${entry.name} ${entry.number}`)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    const newNumber = new person({
        name: process.argv[3],
        number: process.argv[4],
    })
    
    newNumber.save().then(result => {
        console.log('Person saved!')
        mongoose.connection.close()
    })
    
}


// const phonebook = new phonebook({
//   content: 'HTML is Easy',
//   date: new Date(),
//   important: true,
// })



// phonebook.save().then(result => {
//   console.log('phonebook saved!')
//   mongoose.connection.close()
// })