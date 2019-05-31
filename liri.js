//read and set any environment variables with the dotenv package
require("dotenv").config();

//import the keys.js file and store it in a variable
var keys = require("./keys.js");



//access spotify information 
var spotify = new Spotify(keys.spotify);


//takes input from user
var action = process.argv[2];

//depending on user input runs different functions
switch (action) {
    case "concert-this":
    concertThis();
    break;

    // case "spotify-this-song":
    // spotifyThisSong();
    // break;

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
    

}

// // spotify-this-song
// function spotifyThisSong(){

// }


// // movie-this
// function movieThis(){

// }

// // do-what-it-says
// function doWhatItSays(){

// }