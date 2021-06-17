var mongoose=require('mongoose');
var db = require('../Database');
// create an schema
var adminSchema = new mongoose.Schema({
 full_name: String,
 email_address:String,
 mobile_number:Number,
 password:String
 });
module.exports=mongoose.model('Admin',adminSchema,'admins');