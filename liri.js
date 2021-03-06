

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
function callSwitch() {

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
function instructions() {
  console.log("\n\n\nWelcome the LIRI!!!!!!! To get started type one of the following commands followed by a space and then your chosen media surrounded by quotes.");
  console.log("\n *** concert-this 'Band Name' ***\n Will display the venue, location, and date of upcoming shows for the band that you have entered \n");
  console.log("\n *** spotify-this-song 'Song Title' ***\n Will display the name of the song you entered along with artists that have written a song by that name, the album that song was on, and a preview URL of the song.\n");
  console.log("\n *** movie-this 'Movie Title' ***\n Will display the name of the movie that you entered, the year it was made, the IMDB and Rotten Tomato ratings,  the country and language it was made in, and the characters, and plot.\n");
  console.log("\n *** do-what-it-says ***\n Will display a random command with a random media type.\n")
}




// concert-this
function concertThis() {

  //creates input if user does nto enter one and tells user to enter input in the future
  if (input === undefined) {
    console.log("For better results try entering an artist in 'quotes' after the command. But for now view the results for 'Ariana Grande'")
    input = "Ariana Grande"
  }

  var concertQueryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"

  axios.get(concertQueryURL).then(
    function (response) {
      //initial message
      addToLog("\n\n***concert-this: " + input + "***");
      console.log("The concert information for " + input + " is: ");
      
      
      var concertArray = [];

      response.data.forEach(function (element, num) {

        concertArray.push(num + 1 + ".",
          "Venue: " + element.venue.name + " ",
          "Location: " + element.venue.city + ", " + element.venue.country + " ",
          "Date: " + moment(element.datetime).format("MM/DD/YYYY") + " ",
          "\n");

      })

      //outputs message to console and log.txt for each response in the array for each concert
      console.log(concertArray.join(" \n"));
      addToLog(concertArray.join(" \n"));


    })
    .catch(function (error) {
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
function spotifyThisSong() {


  if (input === undefined) {
    console.log("For better results try entering a song in 'quotes' after the command. But for now view the results for 'The Sign' by Ace of Base");
    input = "The Sign ace of base";
  }

//searches for track with limit 1 in spotify api
  spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    //initial message
    addToLog("\n\n***spotify-this-song: " + input + "***");
    console.log("\nThe song information for " + input + " is: ");

    var songArray = [];
    data.tracks.items.forEach(function (element, num) {


      var artists = element.artists.map(function (artist) {
        return artist.name;
      });

      songArray.push("Track Name: " + element.name,
      "Artist/Artists: " + artists.join(", ") + " ",
      "Album: " + element.album.name + " ",
      "Preview URL: " + element.preview_url + " ",
        "\n");
    })

    //outputs message to console and log.txt for each response in the array
  console.log(songArray.join(" \n"));
  addToLog(songArray.join(" \n"));
  
  });
  
  
}


// movie-this
function movieThis() {
  if (input === undefined) {
    console.log("\nFor better results try entering a movie in 'quotes' after the command. But for now view the results for 'Mr. Nobody'\n");
    input = "Mr. Nobody";
  }

  var movieQueryURL = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy"

  //Then run a request with axios to the OMDB API with the movie specified
  axios.get(movieQueryURL).then(
    function (response) {

  //initial message
      addToLog("\n\n***movie-this: " + input + "***");
      console.log("The movie information for " + input + " is: ");

      var movieArray =[];

      movieArray.push("\nTitle: " + response.data.Title + " ", "Year: " + response.data.Year + " ",
      "IMDB rating: " + response.data.imdbRating + " ", response.data.Ratings[1].Source + " rating: " + response.data.Ratings[1].Value + " ",
      "Country: " + response.data.Country + " ",
      "Language: " + response.data.Language + " ", "Plot: " + response.data.Plot + " ",
      "Actors: " + response.data.Actors + " ",
        "\n")

//outputs message to console and log.txt for each response in the array
        console.log(movieArray.join(" \n"));
        addToLog(movieArray.join(" \n"));
    

    })
    .catch(function (error) {
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
function doWhatItSays() {

  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    //splits text file at the , and puts into an array to get length
    data = data.split(",");

    //takes the length of data and choses random value that is half because the first have of the responses is the actions
    var randomNum = Math.floor(Math.random() * Math.floor(data.length / 2))

    //assigns actoin at the position of the random number
    action = data[randomNum].trim();

    //assigns the input that is paired to the action in random file. 
    input = data[randomNum + data.length / 2].trim();
    addToLog("\n\n***do-what-it-says***");

    //calls the switch so that it can be run with the function assigned to the action. 
    callSwitch();

  });
}

//outputs data to log.txt
function addToLog(x) {
  fs.appendFile("log.txt", "\n"+ x, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}