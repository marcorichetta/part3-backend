const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('person', (req, res) => {
    return JSON.stringify(req.body.content)
})

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

app.use(bodyParser.json())

app.use(cors())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "123",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/info', (req, res) => {

    d = new Date()
    res.send(
        `<div>
            Phonebook has info for ${persons.length} people.
            <br>
            ${d}
        </div>`
    )
})

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

app.delete('/api/persons/:id/', (request, response) => {
    const id = Number(request.params.id)

    // Delete only the person with :id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    // Find the max id of the persons array
    const newId = Math.floor(Math.random()*1000)
    return newId
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    const name = body.content.name
    const number = body.content.number

    // Check for content
    if(!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    // Check for name or number
    if(!name || !number) {
        return response.status(404).json({
            error: 'name or number is missing'
        })    
    }

    // Check for duplicated name
    if(persons.find(person => person.name === name)) {
        return response.status(404).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: name,
        number: number,
        id: generateId(),
    }
    
    persons = persons.concat(person)

    response.json(person)
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})