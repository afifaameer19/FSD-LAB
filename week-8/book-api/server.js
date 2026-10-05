const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// In-memory data store for books
let books = [
    { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
    { id: 2, title: "1984", author: "George Orwell", year: 1949 }
];

// 1. GET ALL BOOKS
app.get('/api/books', (req, res) => {
    res.status(200).json(books);
});

// 2. GET A SINGLE BOOK BY ID
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
});

// 3. CREATE A NEW BOOK
app.post('/api/books', (req, res) => {
    const { title, author, year } = req.body;
    
    if (!title || !author || !year) {
        return res.status(400).json({ message: "Please provide title, author, and year" });
    }

    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        year
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// 4. UPDATE AN EXISTING BOOK
app.put('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    const { title, author, year } = req.body;
    
    if (title) book.title = title;
    if (author) book.author = author;
    if (year) book.year = year;

    res.status(200).json({ message: "Book updated successfully", book });
});

// 5. DELETE A BOOK
app.delete('/api/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).json({ message: "Book not found" });

    books.splice(bookIndex, 1);
    res.status(200).json({ message: "Book deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});