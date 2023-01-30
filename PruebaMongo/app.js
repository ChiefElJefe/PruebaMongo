const moongoose = require("mongoose")

moongoose.Promise = global.Promise

moongoose.connect('mongodb://localhost:27017/contactos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let contactoSchema = new moongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlenght: 1,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\d{9}$/
    },
    edad: {
        type: Number,
        min: 18,
        max: 120
    }
})

let Contact = moongoose.model('contactos', contactoSchema)

let contact1 = new Contact({
    nombre: 'Boris',
    telefono: '659996487',
    edad: 37
})

let p1 = contact1.save().then(resultado => {
    console.log('Contacto añadido', resultado)
}).catch(error => {
    console.log('Error añadiendo contacto: ', error)
})

let p2 = Contact.find().then(resultado => {console.log(resultado)})
.catch(error => {console.log(error)})

let p3 = Contact.deleteOne({name: 'Boris'}).then(resultado => {
    console.log(resultado)
}).catch(error =>{
    console.log(error)
})

Promise.all([p1, p2, p3]).then(values => {
    moongoose.connection.close()
})