const express = require('express');
const app = express();
const PORT = 3000;
    
app.get('/merchant', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome Merchant!!");
});
  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});