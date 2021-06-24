const express = require('express');
const app = express();
const PORT = 3004;
    
app.get('/deals&coupons', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to Deals and Coupons Microservice!!");
});
  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});