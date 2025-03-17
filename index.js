const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const booksArchive = {
    books: [],  
    bookMark: 1, 
    detailIncrement: 1  
};


app.get("/books", (req, res) => {

    res.json(booksArchive.books);
});

app.get("/whoami", (req, res) => {

    res.json({ studentNum: "2593217" }); 

});


app.get("/books/:id", (req, res) => {
    const key = req.params.id;

    const book = booksArchive.books.find(m => m.id === key);

    if (!book) {
        return res.status(404).json({ error: "404 Not found" });
    }
    res.json(book);
});

app.post("/books", (req, res) => {
    const title = req.body.title;
    const details = req.body.details;

    if (!title || !Array.isArray(details) || details.length === 0) {

        return res.status(400).json({ error: "400 Bad Request" });
        //Status code 400 means we have received a bad request , Incorrrect parameters may have been inputted. 
    }

    const _create = {
        id: String(booksArchive.bookMark),
        title: title,
        details: details
    };

    booksArchive.books.push(_create);
    booksArchive.bookMark++;

    res.status(201).json(_create);
});

//Status code 201 means that the request was created 


app.put("/books/:id", (req, res) => {
    const key = req.params.id;
    const book = booksArchive.books.find(m => m.id === key);

    if (!book) {
        return res.status(404).json({ error: "404 Not found" });
    }
//Status code 404 means the server couldnt find what we asked for.
    const title = req.body.title;

    if (title) {
        book.title = title;
    }

    res.json(book);
});


app.post("/books/:id/details", (req, res) => {
    const key = req.params.id;
    const book = booksArchive.books.find(m => m.id === key);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    const genre = req.body.genre;
    const author = req.body.author;
    const publicationYear = req.body.publicationYear;

    if (!author || !genre || !publicationYear) {
        return res.status(400).json({ error: "400 Bad Request" });
    }

    const addingArchive = {
        id: String(booksArchives.detailIncrement),
        author: author,
        genre: genre,
        publicationYear: publicationYear
    };

    book.details.push(addingArchive );
    booksArchive.detailIncrement++;

    res.status(201).json(book);
});


