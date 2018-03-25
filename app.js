var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/books_api');
var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var bookRouter = express.Router();
bookRouter.route('/Books')
.post(function(req, res) {
  console.log(req);
  var book = new Book(req.body);
  console.log(book);
  book.save();
  res.send(book);
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

app.use('/api', bookRouter);

app.get('/', function(req, res){
  res.send('API running')
});
app.listen(port, function(){
  console.log("running on port:" + port);
});
