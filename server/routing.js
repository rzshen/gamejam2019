const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Schema = mongoose.Schema;

app.get('/', function(req,res){
  // res.sendFile(__dirname + "/public/index.html");
}); 
// Routing

// Specify backend route
app.get('/api', (request, response) => {
    response.status(200).send({message: 'Hello World!'})
});


app.get('/test', function(req,res){
  res.sendFile(__dirname + "/public/test.html");
});

app.post('/product', function(req,res){
	data = req.body.data;
	aProduct= data.num1 * data.num2;
	console.log(aProduct);
	Product.update({name:'currentNew'}, {product: aProduct},{upsert:true}, function(err, prod){
		if(err) return console.error(err);
		Product.find({name: 'currentNew'}, function(err, docs) {res.send({product: docs[0].product})});
	})
	// var productFromDB = Product.find({name: 'current'}, function(err, docs) {console.log(docs[0].product)});
	// res.send({product: data.num1 * data.num2});
}); 

app.post('/times2', function(req,res){
	Product.find({name: 'currentNew'}, function(err, docs) {res.send({product: docs[0].product*req.body.num1})});
	// next()
	// res.send({product: productFromDB})

}); 