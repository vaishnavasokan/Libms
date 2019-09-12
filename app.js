var express = require("express");
const app=express();
const path=require("path");

var bookrouter=require("./Routes/bookrouter");
var authorrouter=require("./Routes/authorrouter");
var userrouter=require("./Routes/userrouter");

app.use("/book",bookrouter);
app.use("/authors",authorrouter);
app.use("/users",userrouter);


app.use(express.static(path.join(__dirname,"/public")));

app.set("views","./src/views");
app.set("view engine","ejs");

app.listen(process.env.PORT || 8080,function(req,res)
{
    console.log("Server started listening.");
})

app.get("/",function(req,res)
{
    res.render("login",{pagetitle:"Library"});
})

app.get("/signup",function(req,res)
{
    res.render("signup",{pagetitle:"Library"});
})

app.get("/index",function(req,res)
{
    res.render("index",{pagetitle:"Library",nav:[{link:"/book", title:"BOOKS"},{link:"/authors", title:"AUTHORS"},{link:"/book/addbook", title:"ADD BOOK"},{link:"/book/editbook", title:"EDIT/DELETE BOOK"}]});
})









