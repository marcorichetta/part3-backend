# Async / Await

**Chaining promises**

```javascript
Note.find({})
  .then(notes => {
    return notes[0].remove()
  })
  .then(response => {
    console.log('the first note is removed')
  })
```

**Usando await**

```javascript
const notes = await Note.find({})

console.log('operation returned the following notes', notes)
```

1. La ejecución se pausa hasta que la promesa devuelva un resultado 
2. El resultado se guarda en `notes`
3. Continúa la ejecución con la siguiente línea

***
**Ejemplo completo**

> Código más entendible

```javascript
const notes = await Note.find({})
const response = await notes[0].remove()

console.log('the first note was removed')
```
***

**Async y await**

El ejemplo anterior nos dará el error `await is only valid in async function`

Esto es porque `await` solo puede ser usado dentro de una función `async`

```javascript
const main = async () => {

  const notes = await Note.find({})
  console.log('Notes: ', notes)

  const response = await notes[0].remove()
  console.log('the first note was removed')
}

main()
```

> Declaramos `main()` como una función async y la ejecutamos

### Promise.all()

```javascript
beforeEach(async () => {
    await Note.deleteMany({})
    console.log('Cleared')

    helper.initialNotes.forEach(async (note) => {
        let noteObject = new Note(note)
        await noteObject.save()
        console.log('Saved')
    })

    console.log('Done')
})
```

**Output**
```bash

Cleared
Done
Saved
Saved
```

**Problema**
- Cada iteración de `forEach` crea su propia operación async
- `beforeEach` no espera a que terminen de ejecutarse

*Los `await` dentro del `forEach` no están dentro de la función `beforeEach`, sino en una función diferente*

**Solución**

```javascript
beforeEach(async () => {
    await Note.deleteMany({})

    const noteObjects = helper.initialNotes
      .map(note => new Note(note))

    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)
})
```

1. `noteObjects` contiene un array de notas (initialNotes) creadas con el constructor `Note`
2. `promiseArray` es un array de promesas creadas con el método `save()` para guardar cada nota.
3. `Promise.all()` espera que se complete cada promesa en `promiseArray`.