const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type:String,unique:true},
    password:{type:String,required:true},
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    gender:{type:String,required:true},
    country:{type:String},
    isAccepted:{type:Boolean,required:true},
    isNewsAccepted:{type:Boolean},
    // userType:String
})

module.exports = mongoose.model("User",userSchema)