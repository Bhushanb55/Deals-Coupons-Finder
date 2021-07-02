var mongoose=require('mongoose');
var db = require('../database');
mongoose.set('useCreateIndex', true);
var bcrypt = require('bcrypt');
// create an schema
var merchantSchema = new mongoose.Schema({
            merchant_name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
            },

            email_address: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true,
            lowercase: true,
            },

            password: {
                type: String,
                required: [true, 'Please enter a password'],
                minlength: [6, 'Minimum password length is 6 characters'],
            }
        });
// fire a function before doc saved to db
merchantSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
module.exports=mongoose.model('Merchant',merchantSchema,'merchants');