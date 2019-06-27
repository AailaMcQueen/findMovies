
var request = require("request");
var express= require("express");
var app= express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extension: true}));
app.use(express.static("public"));
app.set("view engine", "ejs")
app.listen(process.env.PORT||3000, function(){
  console.log("Search Movies on Port 3000!!")
});
app.get("/results", function(req, res){
  var query = req.query.search;
  var url = "http://omdbapi.com/?apikey=e9d13928&s="+ query;
  var img = "http://img.omdbapi.com/?apikey=e9d13928&s="+ query;
  request(url, function(error, response, body){
    if(!error && response.statusCode== 200){
      var data = JSON.parse(body);
      res.render("results", {data: data, movieSearch: query, imageUrl: img});
    }
});
});
app.get("/", function(req, res){
  res.render("home");
});
