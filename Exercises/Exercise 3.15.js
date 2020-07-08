require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const { response } = require('express')

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

    // Person.find({}).then(persons => {
    //     const personSearch = persons.find(person => person.name === body.name)
    // })

    // if (personSearch) {
    //     const error = {
    //         error: "Name must be unique"
    //     }
    //     response.json(error)
    //     response.status(400).end();
    //     return;
    // }

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
    Person.findById(request.params.id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end();
        }
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
    Person.find({})
    .then(persons => {
        const page = [`Phonebook has info for ${persons.length} people`, "<br></br>", new Date()]
        res.send(page.join(""))
    })
    .catch(error => {
        console.log(error);
        response.status(404).end();
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result =>{
        response.status(204).end()
    })
    .catch(error => {
        console.log(error);
        response.status(400).end();
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})  