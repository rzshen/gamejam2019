// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();



// Connect to mongoDB database
// mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
// // Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
// //Get the default connection
// var db = mongoose.connection;
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date
});

// Compile model from schema
var SomeModel = mongoose.model('SomeModel', SomeModelSchema );


// Create an instance of model SomeModel
var awesome_instance = new SomeModel({ name: 'awesome' });

// Save the new model instance, passing a callback
awesome_instance.save(function (err) {
  if (err) return handleError(err);
  // saved!
});
// Server frontend view
//  Serve static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.static(__dirname + "/public/index.html"));


app.get('/', function(req,res){
  res.sendFile(__dirname + "/public/phaserexample.html");
}); 
// Routing

app.get('/phaser', function(req,res){
  res.sendFile(__dirname + "/public/phaserexample.html");
});

// Specify backend route
app.get('/api', (request, response) => {
    response.status(200).send({message: 'Hello World!'})
});




app.post('/', function(req,res){
	console.log(req.body.data)
	res.send({product: req.body.data.num1 * req.body.data.num2});
	// res.product = req.num1 * req.num2
}); 

//Set app to use express backend router
app.use(router);



// Configure port
const port = 8080;
// Listen to port
app.listen(port);
console.log(`Server is running on port: ${port}`);

