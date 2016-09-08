var mongoose  = require('mongoose');

// bcrypt is used for hashing password.
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// The user schema attributes / characterisitics / fields
var UserSchema = new Schema({
  email: { type: String , unique: true, lowercase: true},
  password: String,
  profile: {
    name:{ type: String, default:''},
    picture: { type String , default:''}
  },
  address: String,
  history:[{
    date: Date,
    paid: {type: Number, default: 0},
    // item: (type: Schema)
  }]
})



// Hash the password before we save it to the database



// compare password in the database and the one that user type in.
