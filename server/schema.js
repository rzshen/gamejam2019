const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Schema = mongoose.Schema;


var Product = mongoose.model('Product', {name: String, product: String });
// var aProduct = new Product({name: "currentNew"});
// 	// aProduct.save().then(() => Product.find({name: 'current1'}, function(err, docs) {res.send({product: docs[0].product})}));
// 	aProduct.save();
//Define a schema
var moveSchema = new Schema({
	direction: {
		type: String, 
		enum: ['up','down','left','right']
	},
	color: {
		type: String,
		enum:['red','blue','green','yellow']
	}
});

var userSchema = new Schema({name: String, active: Boolean});

var solveSchema = new Schema ({
	moves:[moveSchema],
	user: userSchema,
	time: Number});

var Solve = mongoose.model('Solve', solveSchema);