

 var axios = require("axios");
 var Spotify = require('node-spotify-api');
 var moment = require('moment');
 var fs = require("fs");

//read and set any environment variables with the dotenv package
require("dotenv").config();

//import the keys.js file and store it in a variable
var keys = require("./keys.js");



//access spotify information 
var spotify = new Spotify(keys.spotify);


//takes input from user
var action = process.argv[2];
var input = process.argv[3];

//depending on user input runs different functions
function callSwitch(){
  
  switch (action) {
      case "concert-this":
      concertThis();
      break;

      case "spotify-this-song":
      spotifyThisSong();
      break;

      case "movie-this":
      movieThis();
      break;

      case "do-what-it-says":
      doWhatItSays();
      break;

      case "instructions":
      instructions();
      break;
  }
}
callSwitch();

//displays instructions
function instructions(){
  console.log("Welcome the LIRI!!!!!!! To get started type one of the following commands followed by a space and then your chosen media surrounded by quotes.");
  console.log("\n *** concert-this 'Band Name' ***\n Will display the venue, location, and date of upcoming shows for the band that you have entered \n");
  console.log("\n *** spotify-this-song 'Song Title' ***\n Will display the name of the song you entered along with artists that have written a song by that name, the album that song was on, and a preview URL of the song.\n");
  console.log("\n *** movie-this 'Movie Title' ***\n Will display the anme of the movie that you entered, the year it was made, the IMDB and Rotten Tomato ratings,  the country and language it was made in, and the characters, and plot.\n");
  console.log("\n *** do-what-it-says ***\n Will display a random command with a random media type.\n")
}




// concert-this
function concertThis(){
  console.log(input + "input")
   var concertQueryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"

   axios.get(concertQueryURL).then(
  function(response) {

    //console.log(response.data);
response.data.forEach(function(element, num){

  
    console.log(num+1 +".")
    console.log("Venue: " +element.venue.name);
    console.log("Location: " + element.venue.city +", "+ element.venue.country);
    console.log("Date: " + moment(element.datetime).format("MM/DD/YYYY"));
    console.log();


})
    
  })
  .catch(function(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
  })

}

// // spotify-this-song
function spotifyThisSong(){
    spotify.search({ type: 'track', query: input }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

    console.log("The song information for "+ input + " is: "); 

    data.tracks.items.forEach(function(element, num){
      console.log(num+1 +".");
      console.log("Track Name: " + element.name);

      var artists = element.artists.map(function(artist){
        return artist.name;
      });

      console.log("Artist/Artists: " + artists.join(", "));
      console.log("Album: " + element.album.name); 
      console.log("Preview URL: " + element.preview_url);
      console.log();

    })
      
      });

}


// movie-this
function movieThis(){

  var movieQueryURL = "http://www.omdbapi.com/?t=" + input +"&y=&plot=short&apikey=trilogy"

//Then run a request with axios to the OMDB API with the movie specified
axios.get(movieQueryURL).then(
  function(response) {

    addToLog();
    console.log("Title: " + response.data.Title);
    console.log("Year: " +response.data.Year);
    console.log("IMDB rating: " + response.data.imdbRating);
    console.log(response.data.Ratings[1].Source +" rating: "+response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log();

    
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}



// do-what-it-says
function doWhatItSays(){

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.split(",");
    //console.log("data "+ data.length);
    var randomNum = Math.floor(Math.random() * Math.floor(data.length/2))
    //console.log("random Num "+ randomNum);
    //console.log("random Num 2 "+ data.length/2)
    action = data[randomNum].trim();
    input = data[randomNum + data.length/2].trim();
    console.log(action);
    console.log(input);
    callSwitch();


//create object that is array within arrays of random items and then have function call random arrays
  });
}

//outputs data to log.txt
function addToLog(){
  fs.appendFile("log.txt", "\n" + action +"-"+ input, function(err) {
    if (err) {
      return console.log(err);
    }

  });
}