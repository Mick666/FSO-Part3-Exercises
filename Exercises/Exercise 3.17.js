require('dotenv').config()
const express = require('express')
const Sentry = require('@sentry/node');
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const { response } = require('express')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

Sentry.init({ dsn: 'https://9c90d3c164594c849d26b6bcee0613e1@o417684.ingest.sentry.io/5318767' });
app.use(Sentry.Handlers.errorHandler( {
    shouldHandleError(error) {
      // Capture all 404 and 500 errors
      if (error.status === 404 || error.status === 500 || error.status === 400) {
        return true
      }
      return false
    }
  }));
  

morgan.token('body', function (req, res) {return JSON.stringify(req.body) })

app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))

app.use(express.json())

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})


app.post('/api/persons', async (request, response, next) => {
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

    const peopleList = await Person.find({})

    const personSearch = peopleList.find(person => person.name === body.name)

    if (personSearch) { 
        const person = new Person({
            _id: personSearch._id,
            name: body.name,
            number: body.number,
        })

        Person.findByIdAndUpdate(personSearch._id, person, {new: true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' });
            next(error);
        })
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

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end();
        }
    })
    .catch(error => {
        response.status(400).send({ error: 'malformatted id' });
        next(error)
    })
})

app.get('/info', (req, res) => {
    Person.find({})
    .then(persons => {
        const page = [`Phonebook has info for ${persons.length} people`, "<br></br>", new Date()]
        res.send(page.join(""))
    })
    .catch(error => {
        next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result =>{
        response.status(204).end()
    })
    .catch(error => {
        response.status(400).send({ error: 'malformatted id' });
        next(error)
    })
})

app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error('My first Sentry error!');
  });
  

app.use(Sentry.Handlers.errorHandler());

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})  