const should = require('should');
const supertest = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');

const Book = mongoose.model('Book');
const agent = supertest.agent(app);


describe('Book CRUD Test', () => {
    it('Should allow a book to be posted and return a read and _id', done => {
        const bookPost = {'title': 'new book', 'author': 'Jon'};

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end((err, results) => {
                results.body.should.have.property('_id');
                done();
            });
    })

    afterEach(done => {
        Book.remove().exec();
        done();
    })
})