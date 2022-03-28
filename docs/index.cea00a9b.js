class Libro {
    constructor(name, autor, isbn){
        this.name = name;
        this.autor = autor;
        this.isbn = isbn;
    }
}
class UI {
    static mostrarLibro() {
        const books = Datos.traerLibros();
        books.forEach((book)=>UI.agregarLibroLista(book)
        );
    }
    static eliminarLibro(el) {
        if (el.classList.contains('delete')) el.parentElement.parentElement.remove();
    }
    static mostrarAlerta(msm, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(msm));
        const container = document.querySelector('.container');
        const form = document.querySelector('#libro-form');
        container.insertBefore(div, form);
        setTimeout(()=>document.querySelector('.alert').remove()
        , 2000);
    }
    static limpiarCampos() {
        document.querySelector('#titulo').value = '';
        document.querySelector('#autor').value = '';
        document.querySelector('#isbn').value = '';
    }
    static agregarLibroLista(book) {
        const list = document.querySelector('#libro-list');
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${book.name}</td>
        <td>${book.autor}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(fila);
    }
}
class Datos {
    static traerLibros() {
        let books;
        if (localStorage.getItem('books') === null) books = [];
        else books = JSON.parse(localStorage.getItem('books'));
        return books;
    }
    static removerLibro(isbn) {
        const books = Datos.traerLibros();
        books.forEach((book, index)=>{
            if (book.isbn === isbn) books.splice(index, 1);
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
    static agregarLibro(book) {
        const books = Datos.traerLibros();
        books.push(book);
        console.log('books = ', books);
        console.log('book = ', book);
        localStorage.setItem('books', JSON.stringify(books));
    }
}
//Carga de la pagian
document.addEventListener('DOMContectLoaded', UI.mostrarLibro());
//Evento submit del formulario agregar
document.querySelector('#libro-form').addEventListener('submit', (data)=>{
    data.preventDefault();
    //Obtener valores de los campos
    const title = document.querySelector('#titulo').value;
    const autor = document.querySelector('#autor').value;
    const isbn = document.querySelector('#isbn').value;
    if (title == '' || autor == '' || isbn == '') UI.mostrarAlerta('Por favor ingrese los datos perro', 'danger');
    else {
        const book = new Libro(title, autor, isbn);
        Datos.agregarLibro(book);
        UI.agregarLibroLista(book);
        UI.mostrarAlerta('Se agrego correctamente mi perro', 'success');
        UI.limpiarCampos();
    }
});
document.querySelector('#libro-list').addEventListener('click', (e)=>{
    UI.eliminarLibro(e.target);
    Datos.removerLibro(e.target.parentElement.previousElementSibling.textContent);
    UI.mostrarAlerta('Se elimino el libro mi perro', 'success');
});

//# sourceMappingURL=index.cea00a9b.js.map
