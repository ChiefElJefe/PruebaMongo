const moongoose = require("mongoose")

moongoose.Promise = global.Promise

moongoose.connect('mongodb://localhost:27017/libros', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let libroSchema = new moongoose.Schema({
    title: {
        type: String,
        required: true,
        minlenght: 1,
        trim: true
    },
    author: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    img: {
        type: String,
    }
})

let libro = moongoose.model('libro2', libroSchema)

let representaLibros = (libros) => {
    let cat = ''
    console.log(libros[0].title)
    for (let i = 0; i < libros.length; i++) {
        cat += '<div><img src="./img/' + libros[i].img + '" height="170" width="100">' +
            '<br>' +
            '<label><strong>' + libros[i].title + '</strong></label>' +
            '<br>' +
            '<label>' + libros[i].author + '</label> </div>'
    }
    document.getElementById('wrapper').innerHTML = cat
}

let buscarTodos = () => {
    libro.find().then(resultado => {
        representaLibros(resultado)
    }).catch(error => {
        console.log("Error en find")
    })
}

buscarTodos()

document.getElementById('btnBuscarAutor').addEventListener('click', () => {


    libro.find().then(resultado => {
        representaLibros2(resultado)
    }).catch(error => {
        console.log("Error en find")
    })

    let representaLibros2 = (libros) => {
        let cat = ''
        let autor = document.getElementById('txtAutor').value
        for (let i = 0; i < libros.length; i++) {
            if (libros[i].author == autor) {
                cat += '<div><img src="./img/' + libros[i].img + '" height="170" width="100">' +
                    '<br>' +
                    '<label><strong>' + libros[i].title + '</strong></label>' +
                    '<br>' +
                    '<label>' + libros[i].author + '</label> </div>'
            }
        }
        document.getElementById('wrapper').innerHTML = cat
    }

})


/* Promise.all([]).then(values => {
    moongoose.connection.close()
})  */
