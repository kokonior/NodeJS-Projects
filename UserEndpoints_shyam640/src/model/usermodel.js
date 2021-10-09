const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema({
   name : {
      type : String,
      require : true,
      trim : true
   },
   email : {
      type : String,
      required : true,
      unique : true,
      index : true,
      trim : true,
      lowercase : true,
      validate(value){
         if(!validator.isEmail(value))
            throw new Error('Please Enter Correct Email!');
      }
   },
   password : {
      type : String,
      required : true,
      trim : true,
      minlength : 8,
      validate(value){
         if(value.toLowerCase().includes("password"))
            throw new Error('Password cannot contain the word password!');
      }
   },
   age : {
      type : Number,
      required : true,
      trim : true,
      default : 1,
      validate(value){
         if(value<=0)
            throw new Error('Please Enter Age Greater then 1');
      }
   },
   tokens : [{
      token : {
         type : String,
         required : true
      }
   }]
},{
   timestamps : true
});

userSchema.methods.toJSON = async function(){
   const user = this;
   const userObject = user.toObject();
   delete userObject.password;
   delete userObject.tokens;
   delete userObject.avatar;
   return userObject;
}

userSchema.methods.generateAuthToken = async function() {
   const user = this;
   const token = jwt.sign({_id : user._id.toString()} , process.env.JWT_CODE);
   console.log(token);
   user.tokens = user.tokens.concat({token});
   await user.save();
   return token;
}


userSchema.statics.findByCredentials = async (email , password) => {
   const user = await User.findOne({email});
   if(!user)
      throw new Error('Unable to Login!');
   const isMatch = await bcrypt.compare(password,user.password);
   if(!isMatch)
      throw new Error('Unable to Login!');
   return user;
}

userSchema.pre('save', async function (next){
   const user = this;
   if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password,8);
   }
   next();
});


const User = mongoose.model('User',userSchema);

module.exports = User;