const express = require('express');
const corse = require('cors');

const app = express();
const port = 3000;


// where we will keep the books.
let books = [];

app.use(corse());

// configure body perser middleware.

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.post('/books', (req, res) => {
    const book = req.body;

    // console.log(book);
    books.push(book);
    res.send('book is added to the database.');
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    for(let book of books){
        if(book.isbn === isbn){
            res.json(book);
            return;
        }
    }
    
    res.status(404).send('book not found');
});

app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    books = books.filter(i => {
        if(i.isbn !== isbn){
            return true;
        }
        return false;
    });
    
    res.send('The book is deleted.');
});

app.post('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;

    for(let i=0; i < books.length; i++){
        if(books[i].isbn === isbn){
            books[i] = newBook;
        }
    }

    res.send('The book updated.');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));