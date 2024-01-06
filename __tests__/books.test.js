const request = require("supertest");

const app = require("../app");
const db = require("../db");
const Book = require("../models/book");
const ExpressError = require("../expressError");
let b1;
describe("books Routes Test", function () {
    beforeEach(async function () {
        await db.query("DELETE FROM books");
    
        b1 = await Book.create({
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            "year": 2017
          });
      });

    describe("GET /books/", function () {
        test("can get a list of all books", async function () {
          let response = await request(app).get("/books/");
          expect(response.body).toEqual({books: [{
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            "year": 2017
          }]});
        });
    });
    describe("GET /books/:id", function () {
        test("can get a book based on id", async function () {
          let response = await request(app).get(`/books/${b1.isbn}`);
          expect(response.body).toEqual({book:{
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            "year": 2017
          }});
        });
    });
    describe("POST /books/", function () {
        test("can create a book", async function () {
          let response = await request(app).post(`/books`)
          .send({
            "isbn": "0691161519",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew DUDE",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Vidyo Games",
            "year": 2017
          });
          expect(response.body).toEqual({book:{
            "isbn": "0691161519",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew DUDE",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Vidyo Games",
            "year": 2017
          }});
        });
    });
    describe("PUT /books/:isbn", function () {
        test("can update a book", async function () {
          let response = await request(app).put(`/books/${b1.isbn}`)
          .send({
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew DUDE",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Vidyo Games",
            "year": 2017
          });
          expect(response.body).toEqual({book:{
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew DUDE",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Vidyo Games",
            "year": 2017
          }});
        });
    });
    describe("DELETE /books/:isbn", function () {
        test("can delete a book", async function () {
          let response = await request(app).delete(`/books/${b1.isbn}`);
          expect(response.body).toEqual({ message: "Book deleted" });
        });
    });

});
