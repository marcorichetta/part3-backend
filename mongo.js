const mongoose = require('mongoose')

/* Verificar que se pasa un password: node mongo.js {password} */
if (process.argv.length < 3) {
    console.log('give password as an argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@clusterrich-839l9.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose
    .connect(url, { useNewUrlParser: true })
    .catch(err => console.log(err))

/* Un Schema define la estructura de un documento */
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

/* Verificar que se pasaron los 2 args: Nombre y número */
if (process.argv.length < 5) {

    /* Busca todas las notas y las muestra en consola */
    Person
        .find({})
        .then(persons => {
            console.log('Phonebook:\n')
            persons.forEach(person => {

                result = `${person.name} - ${person.number}`
                console.log(result)
            })
        mongoose.connection.close()
        console.log('\nYou must enter name and number of the person to add it to the phonebook')
        process.exit(2)
    })

} else {

    console.log('Adding new person...')
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person
        .save()
        .then(response => {
            console.log(`Added ${person.name} number ${person.number} to phonebook`)
            mongoose.connection.close()
        })
}
