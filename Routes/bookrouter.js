var express = require("express");
const router=express.Router();

var mongoose=require("mongoose");
var url="mongodb://localhost/library"

var book =require("../model/books")

mongoose.connect(url,function(err)
{
    if(err)
    throw err;
    else
        console.log("DB Connected!");
})


router.get("/",function(req,res)
{
    book.find({},function(err,result)
    {
        if(err) 
        throw err;
        else
        {
            console.log(result);
            res.render("books",{pagetitle:"Library",nav:[{link:"/book", title:"BOOKS"},{link:"/authors", title:"AUTHORS"},{link:"/addbook", title:"NEW BOOK"}],bookdetails: result});
        }
    })
   
})

router.get("/:title",function(req,res)
{
    var title=req.params.title;
    console.log(title);

    book.find({title:title},function(err,result)
    {
        if(err) throw err;
        else
        {   
            res.render("viewbook",{pagetitle:"Library",nav:[{link:"/book", title:"BOOKS"},{link:"/authors", title:"AUTHORS"}],
            bookdetails: result});

        }
    });
})


module.exports=router;