const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var app = express();

/////////midleware//////////
app.use(express.static('public'));
app.use(bodyParser.json());
////////////////////////////


//////////model/////////////////
//Create mongoose schema and model
var bookSchema = mongoose.Schema({
  name: {type: String},
  year: Number,
});

var Book = mongoose.model('Book', bookSchema);
////////////////////////////////////



var dbName = 'my_postman';
//mongodb://localhost/my-postman: my-postman is name of db and better convention to use the same name as dir name
mongoose.connect('mongodb://localhost/' + dbName, function(err) {
  if(err) throw "Couldnot connect check if mongod is running";
  else {console.log("Connected to " + dbName + " database");}
});

app.get('/', function(req, res){
  res.sendFile('index.html', {root: __dirname});
});


////////////routes///////
app.get('/books', function(req, res) {

//////////controller/////////
  Book.find({}, function(err, nbooks){
    if(err) {console.log(err);res.send("Couldnot find the book");}
    else {res.json(nbooks);}
  });
});

app.post('/books', function(req, res) {
  console.log(req.body);
 Book.create(req.body, function(err, book) {
   res.json([book]);
 });
});


app.patch('/books/:id', function(req, res) {
    //edit(existing fruit)
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, book) {
      res.json([book]);
    });
});

app.delete('/books/:id', function(req, res) {
    //delete a fruit
    Book.findByIdAndRemove(req.params.id, function(err) {
      res.send({message: "Deleted!!"});
    });
  });

app.listen(3000, function(){
  console.log("Server 3000");
  console.log("Script is located at: " + __dirname);
});
