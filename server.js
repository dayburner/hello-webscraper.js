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


//TITLE


      //We will use the unique header class as a starting point
      $('.header').filter(function(){

      //Let's store the data we filter into a varible so we can easily see what's going on
        var data = $(this);

      //In examing the DOM we notice that the title rests within the first child element of the header tag
      //Utilizing jQuery we can easily navigate and get the text by writing the following code:
        title = data.children().first.text();

      //Once we have our title, we'll store it to our json object
        json.title = title;




//RELEASE YEAR




        //We will repeat the same process as above. This time re notice the release is in the last element
        //This code will move us to the position of the location of the release year
        release = data.children().last().children().text();

        json.title = title;

        //Once again extract the data and save it to the json object
        json.release = release;



      })


//RATING




      //Since the rating is in another part of the DOM, we'll have to write a new jQuery function to extract the data
      $('.start-box-giga-start').filter(function(){
        var data = $(this);


        //The .start-box-giga-star class was exactly where we wanted it to be.
        //To get the rating, we can simply just get the .text(), no need to traverse the DOM
        rating = data.text();
        json.rating = rating;


      })
    }

//WRITE TO FILESYSTEM


    //We will pass 3 parameters to to the writeFile function
    //Parameter 1 : output.json - this is what the created filename will be called.
    //Parameter 2 : JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
    //Parameter 3 : callback function - a callback function to let us know the status of our function

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })
    //send a message to the browser reminding that there is no UI
    res.send('Check your console');


  })
})




app.listen(PORT, function(){
  console.log('Server listening on port ', PORT);
});

exports = module.exports = app;
