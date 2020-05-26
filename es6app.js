//Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    constructor() {}

    addBookToList(book) {
        const tbody = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
        tbody.appendChild(row);
    }

    clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    showAlert(msg, className) {
        //Create alert div
        const div = document.createElement('div');
        //Add ClassName
        div.className = `alert alert-${className}`;
        //Add TextNode
        div.appendChild(document.createTextNode(msg));
        //Get Parent
        const card = document.querySelector('.card');
        //Get Object After
        const form = document.querySelector('#book-form');
        //Insert Object
        card.insertBefore(div, form);
        //Set Timeout
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 1000);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function(book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function(book) {
            const ui = new UI();
            ui.addBookToList(book);
        })
    }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.querySelector('#book-form').addEventListener('submit', function(e) {
    //Get the Form Values
    const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    //Initialize UI Constructor
    const ui = new UI();

    //Validate Input fields
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please check your input', 'danger');
    } else {
        //Create the book object
        const book = new Book(title, author, isbn);

        //Call the Prototype method on UI object
        ui.addBookToList(book);

        //Add Book to Localstorage
        Store.addBook(book);

        //On Success
        ui.showAlert('Book Added!', 'success');

        //Clear Fields
        ui.clearFields();
    }
    //Prevent the form from loading      
    e.preventDefault();
})

document.querySelector('#book-list').addEventListener('click', function(e) {
    //Initialize UI
    const ui = new UI();

    //Delete Book
    ui.deleteBook(e.target);

    //Remove from Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    if (e.target.className === 'delete') {
        ui.showAlert('Book Removed!', 'success');
    }

    e.preventDefault();
})