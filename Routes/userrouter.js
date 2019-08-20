var express = require("express")
const router =express.Router();
var bodyparser = require("body-parser");

var mongoose = require("mongoose");
var url="mongodb://localhost/library"

var user=require("../model/user");
router.use(bodyparser.urlencoded({extended:true}))

mongoose.connect(url,function(err,result)
{
    if(err)
    throw err;
    else
    console.log("DB Connected!");
})

router.post("/login",function(req,res)
{
    user.find({uname:req.body.uname,password:req.body.pwd},function(err,result)
    {
        if(err)
        throw err;
        else
        {
            if(result.length!=0)
            res.redirect("/index");
            else
            res.redirect("/")
        }
        
    })
    
})

router.post("/addnew", function(req,res)
{
    var u1 = new user();
    u1.fname=req.body.fname;
    u1.uname=req.body.uname;
    u1.password=req.body.pwd;
    u1.role=req.body.role;
    u1.save(function(err,result)
    {
        if(err)
            throw err;
        else
        {
            console.log(result);
            console.log("User Added!");
            res.redirect("/");
        }
    })
})

module.exports=router;
