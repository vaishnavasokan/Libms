var mongoose = require("mongoose");
var schema= mongoose.Schema;

var bookschema = new schema(
    {
        title:{type:String,required:true},
        author:{type:String,required:true},
        category:{type:String,required:true},
        price:{type:Number,required:true},
        image:{type:String,required:true}

    }
)

var bookmodel=mongoose.model("books",bookschema,"books");  
module.exports=bookmodel;