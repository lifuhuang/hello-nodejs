const express = require('express');

const bookRouter = (Book) => {
    const bookRouter = express.Router();

    bookRouter.route('/')
        .get((req, res) => {
            const query = req.query;
            Book.find(query, (err, books) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(books);
                }
            });
        })
        .post((req, res) => {
            const book = new Book(req.body);
            book.save();
            res.status(201).send(book);
        });

    bookRouter.route('/:bookId')
        .get((req, res) => {
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(book)
                }
            })
        });

    return bookRouter;
}

module.exports = bookRouter;