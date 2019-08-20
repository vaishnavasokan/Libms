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

app.listen("8080",function()
{
    console.log("Server started.");
})

app.get("/",function(req,res)
{
    res.render("login",{pagetitle:"Library",nav:[{link:"/book", title:"BOOKS"},{link:"/authors", title:"AUTHORS"},{link:"/addbook", title:"NEW BOOK"}]});
})

app.get("/index",function(req,res)
{
    res.render("index",{pagetitle:"Library",nav:[{link:"/book", title:"BOOKS"},{link:"/authors", title:"AUTHORS"},{link:"/addbook", title:"NEW BOOK"}]});
})


app.get("/signup",function(req,res)
{
    res.render("signup",{pagetitle:"Library",nav:[{link:"/book", title:"BOOKS"},{link:"/authors", title:"AUTHORS"},{link:"/addbook", title:"NEW BOOK"}]});
})

