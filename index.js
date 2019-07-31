const express = require('express')
const app = express()

require('dotenv').config()

const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('person', (req, res) => {
    return JSON.stringify(req.body.content)
})

const Person = require('./models/person')

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

app.use(bodyParser.json())

app.use(cors())

app.use(express.static('build'))


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/info', (request, response) => {

    d = new Date()
    // Returns number of documents on DB
    Person.countDocuments({}).then(personsNumber => {
        response.send(
            `<div>
                Phonebook has info for ${personsNumber} people.
                <br>
                ${d}
            </div>`
        )
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    console.log('person', request.params)
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person.toJSON())
        } else {
            response.status(404).send({ error: 'Person not found'}).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id/', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
    const body = request.body

    console.log('BODY', body)
    const name = body.name
    const number = body.number

    // Check for name or number
    if(!name || !number) {
        return response.status(404).json({
            error: 'name or number is missing'
        })    
    }

    const person = new Person ({
        name: name,
        number: number,
    })
    
    person.save()
        .then(savedPerson => {
            response.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

// Response to all unknown endpoints
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

// Define our own error handler
const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'Malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    // Send error to Express Error handler
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})