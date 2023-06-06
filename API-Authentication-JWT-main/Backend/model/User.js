const mongoose = require('mongoose');

const UserSchema = new  mongoose.Schema({
    name:{
      type: String,
      required: true,
      min:6,
    },
    email:{
      type: String,
      required: true,
      min:6,
    },
    password:{
      type: String,
      required: true,
      min:6
    }
  });

module.exports = mongoose.model('User', UserSchema);