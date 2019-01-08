//BOOK CLASS : Represents a Book
class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

// UI Class : handle Ui Tasks
class UI{
    static displayBooks(){
        const StoredBooks = [
            {
                title: "Book One",
                author : "John Doe",
                isbn : "31312312"
            },
            {
                title: "Book Two",
                author: "John Doe",
                isbn: "31312312"
            }
        ];
        const books = StoredBooks;
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }
    static clearFields(){
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }
    static deleteBook(event){
        if(event.classList.contains('delete')){
            event.parentElement.parentElement.remove()
        }
    } 
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout( () => document.querySelector('.alert').remove(),3000);
    }

}



// Store Class : Handles Storage in localstorage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static AddBooks(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBooks(isbn){
        const books = Store.getBooks();
        books.forEach((book,index) => {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books));
    }
}


//Event : Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);
//Event : Add a  Book
document.querySelector('#book-form').addEventListener('submit',(e) => {
    //get form values;
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    
    //validate
    if(title === "" || author === "" || isbn === ""){
        UI.showAlert('tolong diisikan field yang kosong','danger');
    }
    else{
        //instatiate book
        const book = new Book(title, author, isbn);
        console.log(book);
        //add Book to UI
        UI.addBookToList(book);
        Store.AddBooks(book);
        
        UI.showAlert('book sukses ditambahkan','success');
        //Clear fields
        UI.clearFields();

    }

})





//Event : remove A book
document.querySelector('#book-list').addEventListener('click',(e) => {
    console.log(e.target);
    UI.deleteBook(e.target);
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert('book sukses didelete', 'success');
})

