var adminModel = require('../models/admin-models');

module.exports = function (req, res){
    var newAdmin = new adminModel();
    newAdmin.full_name = req.body.full_name;
    newAdmin.email_address = req.body.email_address;
    newAdmin.password = req.body.password;
    newAdmin.mobile_number = req.body.mobile_number;
    
    if(Object.keys(req.body).length === 0 ){
        res.send("There's no data to insert..")
    }
    else{
        newAdmin.save(function(err, created){
            if(err){
                return res.status(400).json({success: false, error: err});
            }
            else{
                res.status(201).json({success:true, data: created})
            }
        });   
    }
}
