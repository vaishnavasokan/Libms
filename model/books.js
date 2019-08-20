var mongoose = require("mongoose");
var schema= mongoose.Schema;

var bookschema = new schema(
    {
        title:String,
        author:String,
        category:String,
        image:String

    }
)

var bookmodel=mongoose.model("books",bookschema,"books");  
module.exports=bookmodel;