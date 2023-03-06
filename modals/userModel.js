const mongoose = require('mongoose');
const validator =require('validator')
const bcrypt = require('bcryptjs')
const userSchema =new mongoose.Schema({
  name: {
    type: String,
   
  },

  email: {
    type: String,
   
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email address']
  },
  photo: String,
 
  password: {
    type: String,
    
    minlength: 8,
    
  },
  passwordConfirm: {
    type: String,
   
    validate:{
        validator:function(el){
            return el ===this.password
        }
    }
    }
  })
  
  
  userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User',userSchema)
module.exports=User;

