const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = mongoose.connect('mongodb://localhost/hello-nodejs');
const Book = require('./models/bookModel');
const bookRouter = require('./routers/bookRouter.js');
const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use('/api/books', bookRouter(Book));

app.get('/', (req, res) => {
    res.send("Hello NodeJS!");
});

app.listen(port, () => {
    console.log(`Gulp is running my app on PORT ${port}`);
});