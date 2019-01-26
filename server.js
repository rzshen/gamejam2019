// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();



// Connect to mongoDB database using mongoose

mongoose.connect('mongodb+srv://GameJam2018:BullShit@gamejam2019-mvzaj.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

var Product = mongoose.model('Product', {name: String, product: String });
var aProduct = new Product({name: "currentNew"});
	// aProduct.save().then(() => Product.find({name: 'current1'}, function(err, docs) {res.send({product: docs[0].product})}));
	aProduct.save();
//Define a schema

// Server frontend view
//  Serve static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.static(__dirname + "/public/index.html"));


app.get('/', function(req,res){
  res.sendFile(__dirname + "/public/index.html");
}); 
// Routing

// Specify backend route
app.get('/api', (request, response) => {
    response.status(200).send({message: 'Hello World!'})
});


app.get('/product', function(req,res){
  res.sendFile(__dirname + "/public/index.html");
});

app.post('/product', function(req,res){
	Product.find({name: 'currentNew'}, function(err, docs) {res.send({product: docs[0].product*req.body.num1})});
	// next()
	// res.send({product: productFromDB})

}); 


app.post('/', function(req,res){
	data = req.body.data;
	aProduct= data.num1 * data.num2;
	console.log(aProduct);
	Product.update({name:'currentNew'}, {product: aProduct},function(err, prod){
		if(err) return console.error(err);
		Product.find({name: 'currentNew'}, function(err, docs) {res.send({product: docs[0].product})});
	})
	// var productFromDB = Product.find({name: 'current'}, function(err, docs) {console.log(docs[0].product)});
	// res.send({product: data.num1 * data.num2});
}); 

//Set app to use express backend router
app.use(router);



// Configure port
const port = 8080;
// Listen to port
app.listen(port);
console.log(`Server is running on port: ${port}`);

