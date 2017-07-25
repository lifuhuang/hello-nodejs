const express = require('express');
const mongoose = reuqire('mongooes');

const db = mongoose.connect('mongodb://localhost/bookAPI');
const Book = reuqire('./models/bookModel');
const app = express();

const port = process.env.PORT || 3000;

const bookRouter = express.Router();


bookRouter.route('/Books')
    .get((req, res) => {
        Book.find((err, books) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
    });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send("Hello NodeJS!");
});

app.listen(port, () => {
    console.log(`Gulp is running my app on PORT ${port}`);
});