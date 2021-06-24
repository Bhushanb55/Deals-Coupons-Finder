var userModel = require('../models/merchant-models');
module.exports = function (req, res){
    var newMerchant = new merchantModel();
    newMerchant.name = req.body.name;
    newMerchant.email_address = req.body.email_address;
    newMerchant.password = req.body.password;
    newMerchant.mobile_number = req.body.mobile_number;
    
    if(Object.keys(req.body).length === 0 ){
        res.send("There's no data to insert..")
    }
    else{
        newMerchant.save(function(err, created){
            if(err){
                return res.status(400).json({success: false, error: err});
            }
            else{
                res.status(201).json({success:true, data: created})
            }
        });

    }
}