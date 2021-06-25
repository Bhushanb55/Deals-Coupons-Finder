var mongoose=require('mongoose');
var db = require('../database');
// create an schema

var dealsAndcouponsSchema = new mongoose.Schema({

    lmd_id: {
        type: String,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    offer_text: {
        type: String,
        required: true
    },
    offer_value: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    terms_and_conditions: {
        type: String,
        required: true
    },
    categories:{
        type: String,
        required: true
    },
    category_array:{
        type: Object,
        required: true,
        Fashion: {
            type: Array,
        },
        Travel:{
            type: Array
        }
    },
    featured: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    smartLink: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    offer: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    start_date:{ 
        type : String,
        required: true
        
    },
    end_date:{ 
        type : String,
        required: true
    }  
});
module.exports=mongoose.model('DealsAndCoupons',dealsAndcouponsSchema,'dealsAndcoupons');