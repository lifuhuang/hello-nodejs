const bookController = (Book) => {
    const get = (req, res) => {
        const query = req.query;
        Book.find(query, (err, books) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                const returnBooks = books.map(element => Object.assign(
                    {}, 
                    element.toJSON(), 
                    {
                        links: { 'self': `http://${req.headers.host}/api/books/${element._id}`, }
                    }));

                res.json(returnBooks);
            }
        });
    };

    const post = (req, res) => {
        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        } else {
            const book = new Book(req.body);
            book.save();
            res.status(201);
            res.send(book);
        }
    };

    return  { get, post };
}

module.exports = bookController;