var mongoose=require('mongoose');
var db = require('../database');
var bcrypt = require('bcrypt');
mongoose.set('useCreateIndex', true);
// create an schema
var userSchema = new mongoose.Schema({

    full_name: {
        type: String,
        required: true,
        minlength: 10,
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

// function to be fired before doc saved to db
userSchema.pre('save', async function(next) {
const salt = await bcrypt.genSalt();
this.password = await bcrypt.hash(this.password, salt);
next();
});

userSchema.statics.login = async function(email_address, password) {
    const user = await this.findOne({ email_address });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
  

module.exports = mongoose.model('User', userSchema, 'users');