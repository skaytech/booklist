//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
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

UI.prototype.clearFields = function() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

UI.prototype.showAlert = function(msg, className) {
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
    }, 2000);
}

UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

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

    if (e.target.className === 'delete') {
        ui.showAlert('Book Removed!', 'success');
    }

    e.preventDefault();
})