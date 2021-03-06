// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const Schema = mongoose.Schema;
var http = require('http').Server(app);
var io = require('socket.io')(http);

// const routing = require('./server/routing.js');
// const schema = require('./server/schema.js');



// Connect to mongoDB database using mongoose

mongoose.connect('mongodb+srv://GameJam2018:BullShit@gamejam2019-mvzaj.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});


// Server frontend view
//  Serve static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.static(__dirname + "/public/index.html"));



// ================================================= ROUTING =============================================


app.get('/', function(req,res){

}); 
// Routing

app.get('/phaser', function(req,res){
  res.sendFile(__dirname + "/public/phaserexample.html");
});

app.get('/grid', function(req,res){
  res.sendFile(__dirname + "/public/grid.html");
});

// Specify backend route
app.get('/api', (request, response) => {
    response.status(200).send({message: 'Hello World!'})
});

//page for testing
app.get('/test', function(req,res){
  res.sendFile(__dirname + "/public/test.html");
});


//multiply 2 numbers
app.post('/product', function(req,res){
	console.log(req.body)
	data = req.body.data;
	aProduct= data.num1 * data.num2;
	console.log(aProduct);
	Product.update({name:'currentNew'}, {product: aProduct},{upsert:true}, function(err, prod){
		if(err) return console.error(err);
		Product.find({name: 'currentNew'}, function(err, docs) {res.send({product: docs[0].product})});
	});
	io.emit('product', aProduct );
	// var productFromDB = Product.find({name: 'current'}, function(err, docs) {console.log(docs[0].product)});
	// res.send({product: data.num1 * data.num2});
}); 


// storing an instance of solve
app.post('/solve', function(req, res){
	aSolve = req.body.solve;
	res.status(200).send();

	Solve.updateOne({ "boardID": aSolve.boardID, "user.name": aSolve.user.name, "timestamp": aSolve.timestamp }
		, { $set: 
			{moves: aSolve.moves, moveCount: aSolve.moves.length, user: aSolve.user, timestamp: aSolve.timestamp, boardID: aSolve.boardID}
		}
		,{upsert:true}
		, function(err, solution){
		if(err) return console.error(err);
		console.log(solution);
		//looking for lowst moveCount from db
		var query = Solve.find({boardID: aSolve.boardID}).sort({moveCount:1}).limit(1);
		query.exec(function(err, currentLowestMoveCount){
			io.emit('opponentSolve', {moveCount: aSolve.moves.length, user: aSolve.user, timestamp: aSolve.timestamp, boardID: aSolve.boardID, lowestCount: currentLowestMoveCount[0].moveCount})
		});
		
	})
// TODO
});


app.get('/times2', function(req,res){
	Product.find({name: 'currentNew'}, function(err, docs) {res.send({product: docs[0].product})});


}); 
app.post('/times2', function(req,res){
	Product.find({name: 'currentNew'}, function(err, docs) {res.send({product: docs[0].product*req.body.num1})});

}); 


// app.get('/getLowestCount', function(req, res){
// 	var query = Solve.find({boardID: 1}).sort({moveCount:1}).limit(1)
// 	query.exec(function(err, docs){res.send({lowestCount: docs[0].moveCount})})
// });

// ==============================================================================================


// ======================================Socket==========================

io.on('connection', function(socket)
{
  console.log('a user connected');
  // On recieving a product test command
  socket.on('product', function(msg){
  	console.log('product:' + msg);
  	io.emit('product', msg)
  });
  socket.on('disconnect', function(){
  	console.log('user disconnected')
  });
});



//Set app to use express backend router
app.use(router);



// Configure port
const port = 8080;
// Listen to port
http.listen(port);
console.log(`Server is running on port: ${port}`);






// ================================================= SCHEMA SETUP=============================================

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

var userSchema = new Schema({
	name: String, 
	active: Boolean,
	score: Number
});

var solveSchema = new Schema ({
	moves:[moveSchema],
	moveCount: Number,
	user: userSchema,
	timestamp: Number,
	boardID: Number});

var Solve = mongoose.model('Solve', solveSchema);

//================================================================================================================