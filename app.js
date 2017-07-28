const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let db;
if (process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/hello-nodejs-test');
} else {
    db = mongoose.connect('mongodb://localhost/hello-nodejs');
}

const Book = require('./models/bookModel');
const bookRouter = require('./routers/bookRouter.js')(Book);
const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
    res.send("Hello NodeJS!");
});

app.listen(port, () => {
    console.log(`Gulp is running my app on PORT ${port}`);
});

module.exports = app;