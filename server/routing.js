const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Schema = mongoose.Schema;
const router = express.Router();

router.get('/', function(req,res){
  // res.sendFile(__dirname + "/public/index.html");
}); 
// Routing

// Specify backend route
router.get('/api', (request, response) => {
    response.status(200).send({message: 'Hello World!'})
});


router.get('/test', function(req,res){
  res.sendFile(__dirname + "/public/test.html");
});

router.post('/product', function(req,res){
	console.log(req.body)
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

router.post('/solve', function(req, res){
	// console.log(req.body.solve.boardID);
	aSolve = req.body.solve;
	res.status(200).send();

	console.log(aSolve.moves.length)
	Solve.updateOne({ "boardID": aSolve.boardID, "user.name": aSolve.user.name }
		, { $set: 
			{moves: aSolve.moves, user: aSolve.user, timestamp: aSolve.timestamp, boardID: aSolve.boardID}
		}
		,{upsert:true}
		, function(err, solution){
		if(err) return console.error(err);
		console.log(solution);
	})
});

router.post('/times2', function(req,res){
	Product.find({name: 'currentNew'}, function(err, docs) {res.send({product: docs[0].product*req.body.num1})});
	// next()
	// res.send({product: productFromDB})

}); 