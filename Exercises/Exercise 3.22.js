require('dotenv').config()
const express = require('express')
const Sentry = require('@sentry/node')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

Sentry.init({ dsn: 'https://9c90d3c164594c849d26b6bcee0613e1@o417684.ingest.sentry.io/5318767' })
  
app.get('/api/persons', (request, response, next) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
    const body = request.body
    
    if (!body.name) {
        const error = {
            error: 'Name is missing'
        }
        response.json(error)
        response.status(400).end()
        return
    } else if (!body.number) {
        const error = {
            error: 'Number is missing'
        }
        response.json(error)
        response.status(400).end()
        return
    }
            
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    
    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => {
            next(error)
        })
    
})

app.put('/api/persons/:id', (request, response, next) => {

    const person = new Person({
        _id: request.params.id,
        name: request.body.name,
        number: request.body.number,
    })

    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
            next(error)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
            next(error)
        })
})

app.get('/info', (req, res, next) => {
    Person.find({})
        .then(persons => {
            const page = [`Phonebook has info for ${persons.length} people`, '<br></br>', new Date()]
            res.send(page.join(''))
        })
        .catch(error => {
            next(error)
        })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            console.log(result)
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
            next(error)
        })
})

app.use(Sentry.Handlers.errorHandler())

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {    
        return response.status(400).json({ error: error.message })  
    }
  
    next(error)
}
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


morgan.token('body', function (req) {return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})  