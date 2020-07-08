require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function (req, res) { 
    return JSON.stringify(req.body) })

app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))

app.use(express.json())

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

  
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        const error = {
            error: "Name is missing"
        }
        response.json(error)
        response.status(400).end();
        return;
    } else if (!body.number) {
        const error = {
            error: "Number is missing"
        }
        response.json(error)
        response.status(400).end();
        return;
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    console.log(person)

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
})

app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        const page = [`Phonebook has info for ${persons.length} people`, "<br></br>", new Date()]
        res.send(page.join(""))
    })
})

app.delete('/api/persons/:id', (request, response) => {
    app.use(morgan('combined'))
    const id = Number(request.params.id)
    const deletedPerson = persons.find(person => person.id === id);
    if (deletedPerson) {
        persons = persons.filter(person => person.id !== id)
        response.status(204).end();
    } else {
        response.status(404).end();
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})  