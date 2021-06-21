var mongoose=require('mongoose');
var db = require('../database');
// create an schema
var userSchema = new mongoose.Schema({

            full_name: {
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
            mobile_number: {
                type: Number,
                required: true
            }
            
        });
module.exports=mongoose.model('User',userSchema,'users');