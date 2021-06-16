const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");


app.get('/user', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome User!!");
});
  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});