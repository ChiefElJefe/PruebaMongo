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

document.getElementById('idTodo').addEventListener('click', () => {
    buscarTodos()
})
/*
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

}) */


/* document.getElementById('btnBuscarTitulo').addEventListener('click', () => {


    libro.find().then(resultado => {
        representaLibros2(resultado)
    }).catch(error => {
        console.log("Error en find")
    })

    let representaLibros2 = (libros) => {
        let cat = ''
        let titulo = document.getElementById('txtTitulo').value
        for (let i = 0; i < libros.length; i++) {
            if (libros[i].title == titulo) {
                cat += '<div><img src="./img/' + libros[i].img + '" height="170" width="100">' +
                    '<br>' +
                    '<label><strong>' + libros[i].title + '</strong></label>' +
                    '<br>' +
                    '<label>' + libros[i].author + '</label> </div>'
            }
        }
        document.getElementById('wrapper').innerHTML = cat
    }

}) */

document.getElementById('btnBuscarAutor').addEventListener('click', () => {

    let autor = document.getElementById('txtAutor').value

    if (autor == "") {
        let notification = document.querySelector('#notification')
        notification.innerHTML = "Debe escribir algo"
        notification.opened = true
    } else {

        libro.find({ author: { $regex: autor } }).then(resultado => {
            representaLibros(resultado)
        }).catch(error => {
            console.log("Error en find")
        })

    }
})

document.getElementById('btnBuscarTitulo').addEventListener('click', () => {

    let titulo = document.getElementById('txtTitulo').value

    if (titulo == "") {
        let notification = document.querySelector('#notification')
        notification.innerHTML = "Debe escribir algo"
        notification.opened = true
    } else {

        libro.find({ title: { $regex: titulo } }).then(resultado => {
            representaLibros(resultado)
        }).catch(error => {
            console.log("Error en find")
        })
    }
})

let p2

document.getElementById('idNuevo').addEventListener('click', () => {
    let cat =
        + '<form>'
        + '<div class="form-group">'
        + '<label>Titulo</label>'
        + '<input type="text" class="form-control" id="idTitulo" placeholder="Titulo">'
        + '</div>'
        + '<div class="form-group">'
        + '<label>Autor</label>'
        + '<input type="text" class="form-control" id="idAutor" placeholder="Autor">'
        + '</div>'
        + '<div class="form-group">'
        + '<input type="button" class="form-control" id="boton1" value="Aceptar">'
        + '</div>'
        + '</form>'

    document.getElementById('wrapper').innerHTML = cat

    document.getElementById('boton1').addEventListener ('click', ()=>{
        let autor = document.getElementById('idAutor').value
        let titulo = document.getElementById('idTitulo').value

        let clibro = new libro({
            title: titulo,
            author: autor,
            img: "9.jpg"
        })

        p2 = clibro.save().then(resultado => {
            buscarTodos()
        }).catch(error => {
            console.log(error)
        })
        /* Promise.all([p2]).then(values => {
            moongoose.connection.close()
        })   */
    })
})

 

