var express = require("express");
const router=express.Router();
var path=require('path');
var bodyparser = require("body-parser");

var mongoose = require("mongoose");
//var url="mongodb://localhost/library"

var url="mongodb+srv://vaishnavasokan:Vysh1234*@cluster0-j3qq4.mongodb.net/library?retryWrites=true&w=majority"

var book =require("../model/books");
router.use(bodyparser.urlencoded({extended:true}))

 mongoose.connect(url,{ useNewUrlParser: true },function(err,result)
 {
     if(err)
     throw err;
     else
     console.log("DB Connected!");
})

// mongoose.connect(url,{ useNewUrlParser: true }).then(() => {
// console.log("Connected to Database");
// // }).catch((err) => {
//     console.log("Not Connected to Database ERROR! ", err);
// });


var multer=require("multer");

var storage =   multer.diskStorage({  
    destination: (req, file, callback)=>{  
      callback(null, './public/image');  
    },  
    filename: (req, file, callback)=>{  
      callback(null, file.originalname);  
    }  
  });  

var upload = multer({ storage : storage}).single('bimage'); 


router.get("/",function(req,res)
{
    book.find({},function(err,result)
    {
        if(err) 
        throw err;
        else
        {
            console.log(result);
            res.render("books",{pagetitle:"Library",nav:[{link:"/book", title:"BOOKS"},{link:"/authors", title:"AUTHORS"},{link:"/book/addbook", title:"ADD BOOK"},{link:"/book/editbook", title:"EDIT/DELETE BOOK"}],bookdetails: result});
        }
    })
   
})

router.get("/addbook",function(req,res)
{
    res.render("addbook",{pagetitle:"Library",nav:[{link:"/book", title:"BOOKS"},{link:"/authors", title:"AUTHORS"},{link:"/book/addbook", title:"ADD BOOK"},{link:"/book/editbook", title:"EDIT/DELETE BOOK"}]});
})

router.post("/newbook",upload, function(req,res)
{
    var b1 = new book();
    b1.title=req.body.title;
    b1.author=req.body.author;
    b1.category=req.body.category;
    b1.price=req.body.price;
    b1.image=req.file.filename;
    b1.save(function(err,result)
    {
        if(err)
            throw err;
        else
        {
            console.log(result);
            console.log("Book Added!");
            res.redirect("/book");
        }
    })
})

router.get("/view/:img",(req,res)=>{        
    res.sendFile(path.join(__dirname+"../../public/image/"+req.params.img))
})

router.get("/editbook",function(req,res)
{
    book.find({},function(err,result)
    {
        if(err) throw err;
        else
        res.render("editbook",{pagetitle:"Library",nav:[{link:"/book", title:"BOOKS"},{link:"/authors", title:"AUTHORS"},{link:"/book/addbook", title:"ADD BOOK"},{link:"/book/editbook", title:"EDIT/DELETE BOOK"}],bookdetails: result}); 
    })
    
})

router.get("/update/:title",(req,res)=>{
    book.find({title:req.params.title},(err,result)=>{
        if (err) throw err;
        else
        res.render("updatebook",{pagetitle:"Library",nav:[{link:"/book", title:"BOOKS"},{link:"/authors", title:"AUTHORS"},{link:"/book/addbook", title:"ADD BOOK"},{link:"/book/editbook", title:"EDIT/DELETE BOOK"}],bookdetails: result}); 
    })
})

router.post("/updatedata",upload,(req,res)=>{
    book.updateOne({title:req.body.title},{$set:{title:req.body.title,author:req.body.author,
        category:req.body.category,price:req.body.price,image:req.file.filename}},(err,result)=>
        {
            if (err) throw err;
            else
            {
                console.log("Data Updated!")
                book.find({},(err,result)=>{
                if (err) throw err;
                else
                    res.redirect("/book/editbook")
                
            })
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
            res.render("viewbook",{pagetitle:"Library",nav:[{link:"/book", title:"BOOKS"},{link:"/authors", title:"AUTHORS"},{link:"/book/addbook", title:"ADD BOOK"},{link:"/book/editbook", title:"EDIT/DELETE BOOK"}],
            bookdetails: result});

        }
    });
})

router.get("/delete/:title",(req,res)=>{
    book.deleteOne({title:req.params.title},(err,result)=>{
        if (err) throw err;
        else
        {
            book.find({},(err,result)=>{
                if(err) throw err;
                else
                {
                    console.log("Data Deleted")
                    res.redirect("/book/editbook")
                }
                    
            })
        }
    })
})

module.exports=router;