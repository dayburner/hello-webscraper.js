var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var PORT = 8081;


var app = express();

app.get('/scrape', function(req, res){

})





app.listen(PORT, function(){
  console.log(Server listening on port ', PORT);
});

exports = module.exports = app;
