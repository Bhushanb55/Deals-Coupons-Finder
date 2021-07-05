var mongoose=require('mongoose');
var db = require('../database');
mongoose.set('useCreateIndex', true);
var bcrypt = require('bcrypt');
// create an schema
var adminSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    email_address: {
        type: String,
        required: [true, 'Enter an email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    mobile_number: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    }
});

// fire a function before doc saved to db
adminSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
module.exports=mongoose.model('Admin',adminSchema,'admins');