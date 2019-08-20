var mongoose = require("mongoose");
var schema=mongoose.Schema;

var userschema =  new schema(
    {
        fname:{type:String,required:true},
        uname:{type:String,required:true},
        password:{type:String,required:true},
        role:{type:String,required:true}
    }
)
var usermodel=mongoose.model("user",userschema,"user");
module.exports=usermodel;
