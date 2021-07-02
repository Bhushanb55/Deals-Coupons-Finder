var dealsandModel = require('../models/dealsAndcoupons-models');

module.exports = function (req, res){
    var newdealsAndcoupons = new dealsandModel();
    newdealsAndcoupons.lmd_id = req.body.lmd_id;
    newdealsAndcoupons.store = req.body.store;
    newdealsAndcoupons.offer_text = req.body.offer_text;
    newdealsAndcoupons.offer_value = req.body.offer_value;
    newdealsAndcoupons.title = req.body.title;
    newdealsAndcoupons.description = req.body.description;
    newdealsAndcoupons.code = req.body.code;
    newdealsAndcoupons.terms_and_conditions = req.body.terms_and_conditions;
    newdealsAndcoupons.categories = req.body.categories;
    newdealsAndcoupons.category_array = req.body.category_array;
    newdealsAndcoupons.featured = req.body.featured;
    newdealsAndcoupons.url = req.body.url;
    newdealsAndcoupons.smartLink = req.body.smartLink;
    newdealsAndcoupons.image_url = req.body.image_url;
    newdealsAndcoupons.type = req.body.type;
    newdealsAndcoupons.offer = req.body.offer;
    newdealsAndcoupons.status = req.body.status;
    newdealsAndcoupons.start_date = req.body.start_date;
    newdealsAndcoupons.end_date = req.body.end_date;
    

    if(Object.keys(req.body).length === 0 ){
        res.send("There is no data to insert....")
    }
    else{
        newdealsAndcoupons.save(function(err, created){
            if(err){
                return res.status(400).json({success: false, error: err});
            }
            else{
                res.status(201).json({success:true, data: created})
            }
        });   
    }
   
}

