## Express | Heroku

Este ejemplo tiene los siguientes scripts definidos en `package.json`
- **watch:** Utiliza nodemon para ejecutar index.js (Reinicia con cada cambio a index.js)
- **build:ui:** Crea un build preparado para producción de la part2 (Frontend) y lo mueve a este dir
- **deploy:** git push a heroku
- **deploy:full:** `build:ui` + git commit + `deploy`

## MongoDB

### Schema
***
Un Schema define la estructura de un documento

### Models
***
```javascript
const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true,
})
```

- Los modelos son como `constructor functions`
- Crean JS objects basados en los parámetros que se le pasan
- Además le agregan métodos al objeto, por ejemplo `save()` para guardar a DB

```javascript
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
```

@param String: Nombre en singular del modelo
@param noteSchema: Schema del que toma las propiedades


**Important**

- The `.model()` function makes a copy of `schema`. Make sure that you've added everything you want to `schema`, including hooks, before calling `.model()`!

It is possible to store documents with completely different fields in the same collection.