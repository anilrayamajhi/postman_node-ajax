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

app.get('/create-book-test', function(req, res) {
  Book.create({name: 'le petit prince', year: 1953}, function(err, book){
    res.send("Successfully created");
  });
});

app.post('/books', function(req, res) {
  console.log(req.body);
  res.json({message: "you tried to post the books"});
});

app.listen(3000, function(){
  console.log("Server 3000");
  console.log("Script is located at: " + __dirname);
});
