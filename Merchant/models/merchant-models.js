var mongoose=require('mongoose');
var db = require('../database');
// create an schema
var merchantSchema = new mongoose.Schema({

            merchant_name: {
                type: String,
                required: true
            },
            email_address: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            
        });
module.exports=mongoose.model('Merchant',merchantSchema,'merchants');