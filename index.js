const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')


app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function (req, res) { 
    return JSON.stringify(req.body) })

app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))

app.use(express.json())

let persons =   [
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 1
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 2
    },
    {
      "name": "Joe Blogg",
      "number": "1234-1234",
      "id": 3
    }
]


app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)  
    } else {    
        response.status(404).end()  
    }
})

app.get('/info', (req, res) => {
    const page = [`Phonebook has info for ${persons.length} people`, "<br></br>", new Date()]
    res.send(page.join(""))
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

const generateId = () => {
    return Math.floor(Math.random() * 1000)
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body

    const personSearch = persons.find(person => person.name === body.name)

    if (personSearch) {
        const error = {
            error: "Name must be unique"
        }
        response.json(error)
        response.status(400).end();
        return;
    }

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
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }

    // console.log(person)
  
    persons = persons.concat(person)
  
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})