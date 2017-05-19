var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var PORT = 8081;


var app = express();

app.get('/scrape', function(req, res){

  //URL to scrape - Anchorman 2
  url = 'http://www.imdb.com/title/tt1229340/';

  //Request call
  //First parameter is URL
  //Callback takes 3 parameters, an error, responce status code, and the html
  request(url, function(error, responce, html){

    //First, check to ensure no errors are received from responce
    if(!error) {

      //Next, use cheerio on returned html for jquery-like functionaility
      var $ = cheerio.load(html);

      //Finally, define varibles to capture
      var title, release, rating;
      var json = { title : "", release : "", rating : ""};





      //We will use the unique header class as a starting point
      $('.header').filter(function(){

      //Let's store the data we filter into a varible so we can easily see what's going on
        var data = $(this);

      //In examing the DOM we notice that the title rests within the first child element of the header tag
      //Utilizing jQuery we can easily navigate and get the text by writing the following code:
        title = data.children().first.text();

     //Once we have our title, we'll store it to our json object
        json.title = title;

      })
    }
  })
})





app.listen(PORT, function(){
  console.log('Server listening on port ', PORT);
});

exports = module.exports = app;
