const express = require('express')
const app = express()

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
    const id = Number(request.params.id)
    const deletedPerson = persons.find(person => person.id === id);
    console.log(deletedPerson)
    if (deletedPerson) {
        persons = persons.filter(person => person.id !== id)
        console.log(persons)
        response.status(204).end();
    } else {
        response.status(404).end();
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})