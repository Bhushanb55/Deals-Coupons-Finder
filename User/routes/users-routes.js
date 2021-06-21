const express = require('express');
var userContoller = require('../controllers/insert-user-controller');
const app = express();
// var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); 
  
// Parses the text as json
app.use(bodyParser.json());
const PORT = 3000;
    
app.get('/users', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome Users!!");
});
app.post('/users', userContoller);
app.put('/users', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to update a user!!");
});
app.delete('/users', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to delete a user!!");
});  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});