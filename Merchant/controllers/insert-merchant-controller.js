var merchantModel = require('../models/merchant-models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports = function (req, res){
    var newMerchant = new merchantModel();
    newMerchant.merchant_name = req.body.merchant_name;
    newMerchant.email_address = req.body.email_address;
    newMerchant.password = req.body.password;
   
    
    if(Object.keys(req.body).length === 0 ){
        res.send("There is no data to insert..")
    }
    else{
        newMerchant.save(function(err, created){
            if(err){
                return res.status(500).json({success: false, error: err});
            }
            else{
                res.status(201).json({success:true, data: created})
            }
        });
    }
}