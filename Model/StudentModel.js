const Mongoose = require('mongoose');

const StudentSchema = new Mongoose.Schema({
email:{
    type:String,
    required:true,
    trim:true,
    lowerCase:true,
    unique:true
},
Username:{
    type:String,
    required:true,
    trim:true,
    lowerCase:true,
},
    otp:{
        type:String,
    },

    ExpiryOtp:{
        type:Date
    },
resetToken:{
     
        type:String,
   
},
ExpiryToken:{
        type:Date
    },
    password:{
    type:String,
    required:true,
},

 isVerified: {
 type: Boolean,
default: false 
},

role:{
type:String,
enum:['user','admin'],//a restriction rule
default:'user'
},

},{timestamps:true});

module.exports = Mongoose.model('Student',StudentSchema);