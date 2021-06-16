var mongoose=require('mongoose');
var db = require('../Database');
// create an schema
var adminSchema = new mongoose.Schema({
 full_name: String,
 email_address:String,
 password:String,
 mobile_number:Number
 });
module.exports=mongoose.model('Admin',adminSchema,'admins');