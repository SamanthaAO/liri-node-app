

 var axios = require("axios");
 var Spotify = require('node-spotify-api');

 var moment = require('moment');

 moment();

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
switch (action) {
    case "concert-this":
    concertThis();
    break;

    case "spotify-this-song":
    spotifyThisSong();
    break;

    // case "movie-this":
    // movieThis();
    // break;

    // case "do-what-it-says":
    // doWhatItSays();
    // break;
}

//gana use a switch here!!!
// concert-this
function concertThis(){
   var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"

   axios.get(queryURL).then(
  function(response) {

response.data.forEach(function(element, num){
    console.log(num+1 +" : " +element.venue.name);
    console.log(element.venue.city +", "+ element.venue.country);
    console.log(moment(element.datetime).format("MM/DD/YYYY"));


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
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
    data.tracks.items.forEach(function(element, num){
      console.log(num+1 +" : " + element.name)

      var artists = element.artists.map(function(artist){
        return artist.name;
      });

      console.log(artists.join(", "));
      console.log(element.album.name); 
      console.log(element.preview_url);

    })
      
      //console.log(data.tracks.items); 
      });

}


// // movie-this
// function movieThis(){
// Then run a request with axios to the OMDB API with the movie specified
// axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
//   function(response) {
//     console.log("The movie's rating is: " + response.data.imdbRating);
//   })
//   .catch(function(error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log("---------------Data---------------");
//       console.log(error.response.data);
//       console.log("---------------Status---------------");
//       console.log(error.response.status);
//       console.log("---------------Status---------------");
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an object that comes back with details pertaining to the error that occurred.
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log("Error", error.message);
//     }
//     console.log(error.config);
//   });
// }

// // do-what-it-says
// function doWhatItSays(){

// }