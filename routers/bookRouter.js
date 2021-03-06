const express = require('express');

const bookRouter = (Book) => {
    const bookRouter = express.Router();
    const bookController = require('../controllers/bookController.js')(Book);

    bookRouter.route('/')
        .get(bookController.get)
        .post(bookController.post);

    bookRouter.use('/:bookId', (req, res, next) => {
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                res.status(500).send(err);
            } else if (book) {
                req.book = book;
                next();
            } else {
                res.status(404).send('No book found.');
            }
        })
    });

    bookRouter.route('/:bookId')
        .get((req, res) => {
            res.json(req.book);
        })
        .put((req, res) => {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.save(err => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        .patch((req, res) => {
            for (const key in req.body) {
                if (req.body.hasOwnProperty(key) && key !== '_id') {
                    req.book[key] = req.body[key];
                }
            }

            req.book.save(err => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        .delete((req, res) => {
            req.book.remove(err => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        });

    return bookRouter;
}

module.exports = bookRouter;