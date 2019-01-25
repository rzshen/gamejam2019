// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();



// Connect to mongoDB database using mongoose

mongoose.connect('mongodb+srv://GameJam2018:BullShit@gamejam2019-mvzaj.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
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

