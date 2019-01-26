// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const Schema = mongoose.Schema;
const routing = require('./server/routing.js');
const schema = require('./server/schema.js');



// Connect to mongoDB database using mongoose

mongoose.connect('mongodb+srv://GameJam2018:BullShit@gamejam2019-mvzaj.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});


// Server frontend view
//  Serve static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.static(__dirname + "/public/index.html"));



//Set app to use express backend router
app.use(router);



// Configure port
const port = 8080;
// Listen to port
app.listen(port);
console.log(`Server is running on port: ${port}`);

