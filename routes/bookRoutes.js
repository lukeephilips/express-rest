var express = require('express');

var routes = function(Book) {
  var bookRouter = express.Router();
  bookRouter.route('/Books')
  .post(function(req, res) {
    var book = new Book(req.body);
    console.log(book);
    book.save();
    res.status(201).send(book);
  })
  .get(function(req, res){
    var query = {};
    if (req.query.genre) {
      query.genre = req.query.genre
    };
    Book.find(query, function(err, books){
      if (err){
        console.log(err);
      } else {
        res.json(books);
      };
    });
  });
  bookRouter.route('/Book/:id')
  .get(function(req, res){
    var id = req.params.id;
    console.log(req.params.id);
    Book.findById(id, function(err, book){
      if (err){
        console.log(err);
      } else {
        res.json(book);
      };
    });
  });
  .put(function(req, res){
    Book.findById(id)
  })
  return bookRouter;
};
module.exports = routes;
