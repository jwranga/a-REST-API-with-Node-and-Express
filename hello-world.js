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

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));