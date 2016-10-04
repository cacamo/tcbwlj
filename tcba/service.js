var express = require('express')//是express的实例
var app = express();
app.use(express.static("tongbang"))
// app.get("/",function(req,res){
// 	res.send("hello app!")
// })
app.get("/html",function(req,res){
	res.send("html")
})

app.listen(3100,function(){
	console.log("123");
});

