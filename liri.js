require("dotenv").config();

//variables below
// the ./ below tells javascript to look for the keys.js file
var keys = require('./keys.js');
var axios = require("axios")
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var input = process.argv[2];
var searchType = process.argv.splice(3).join();


// var cmd = process.argv[2]
// var topic = process.argv.slice(3).join(" ")
// console.log(cmd, topic)


// If else statements for user input

//OMDB
if (input === 'movie-this') {
    movieThis(searchType);
}
//BANDS IN TOWN
else if (input === 'concert-this') {
    concertThis(searchType);
}
    
//SPOTIFY
else if (input === 'spotify-this-song') {
    spotifyTrack(searchType);
}
else if (input === 'do-what-it-says') {
    doWhatItSays(searchType);
}
else {
    console.log('please choose valid command');
}

//OMDB Function

function movieThis(movie) {
    var movieQuery = movie || "Mr. Nobody"

    axios.get("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(function (response) {
        var divider = "\n--------------------------------------------------------------\n\n";
        var jsonData = response.data;

        if (jsonData.title != undefined) {
        }
        else {
        }
        
        var movieData = [
            'Title: ' + jsonData.Title,
            'Year: ' + jsonData.Year,
            'imdb Rating: ' + jsonData.imdbRating,
            'Country: ' + jsonData.Country,
            'Language: ' + jsonData.Language,
            'Plot: ' + jsonData.Plot,
            'Cast: ' + jsonData.Actors,
        ].join("\n\n");

        fs.appendFile("random.txt", movieData + divider, function(err) {
            if(err) throw err;
            console.log(divider + movieData);
        });
    })
};

// BANDS IN TOWN FUNCTION

function concertThis(concert) {
    var concertQuery = concert || "'The Sign' by Ace of Base"

    axios.get("https://rest.bandsintown.com/artists/" + concertQuery + "/events?app_id=codingbootcamp").then(function (response) {
        var jsonData = response.data;

        for (var i = 0; i < jsonData.length; i++) {
            var divider = "\n--------------------------------------------------------------\n\n";
            var concertFind = [
                "\nVenue Name: " + jsonData[i].venue.name,
                "\nLocation: " + jsonData[i].venue.city,
                "\nDate of Concert: " + moment(jsonData[i].datetime).format("L"),
            ].join("\n\n")

            fs.appendFile("random.txt", concertFind + divider, function(err) {
                if(err) throw err;
                console.log(divider + concertFind);
            });
            
            console.log(divider + concertFind);
        };
    });
};


//SPOTIFY FUNCTION

function spotifyTrack(track) {
    console.log(track);

    spotify.search({ type: 'track', query: track }, function(err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var jsonData = response.tracks;
        console.log(jsonData);

        for (var i = 0; i < 5; i++) {
            var divider = "\n--------------------------------------------------------------\n\n";
            var trackInfo = [

                "\nArtist: " + jsonData.items[i].artists[0].name,
                "\nTrack Name: " + jsonData.items[i].name,
                "\nAlbum Name: " + jsonData.items[i].album.name,
                "\nPreview Track: " + jsonData.items[i].preview_url,
            ]

            console.log(divider + trackInfo);

            fs.appendFile("random.txt", trackInfo + divider, function(err) {
                if(err) throw err;
                console.log(divider + trackInfo);
            });
        }
    })      

};

//DO WHAT IT SAYS FUNCTION

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, response) {
        if (err) throw err;

        var responseArr = response.split(',');
        console.log('');
        console.log('---MAIN--CONTENT---');
        console.log('');

        for (var i = 0; i < responseArr.length; i++) {
            
            if (responseArr[i] === 'movie-this') {
                movieThis(searchType);
            } else if (responseArr[i] === 'spotify-this-song') {
                spotifyTrack(searchType);
            } else if (responseArr[i] === 'concert-this') {
                concertThis(searchType);
            } else {
                console.log('Command is not valid!');
            }
        }
    })
}

// switch (cmd) {
//     case "concert-this":
//         concertQuery();
//         break;
//     case "spotify-this-song":
//         songQuery();
//         break;
//     case "movie-this":
//         movieQuery();
//         break;
//     case "d0-what-it-says":
//         fileQuery();
//         break;
//     default:

//         console.log("I don't know what you want")
// }

// function concertQuery() {

//     var query = "https://rest.bandsintown.com/artists/" + topic + "/events?app_id=codingbootcamp"
//     axios.get(query).then(function (response) {
//         console.log(response.data[0])
//         var places = response.data
//         for(var i=0; i<places.length;i++) {
//             console.log(places[i].venue.name,places[i].venue.city,places[i].venue.country, places[i].datetime)
//         }

//     })
// }
// var getArtistNames = function (artist) {
//     return artist.name;
// }
{/* have spotify call out a song name when searched
then tell the query to input the song name inside the function */}
// var getMeSpotify = function (songName) {

//     spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
//         if (err) {
//             console.log('Error occurred: ' + err);
//             return
//         }

//         var songs = data.tracks.items;
//         for (var i = 0; i < songs.length; i++) {
//             console.log(i);
//             console.log('artist(s): ' + songs[i].artist.map(
//                 getArtistNAmes
//             ));
//             console.log('song name: ' + songs[i].name);
//             console.log('preview song: ' + songs[i].preview_url);
//             console.log('album: ' + songs[i].album.name);
//             console.log('----------------------');


//         }

//         console.log(data.tracks.items[0]);
//     });
// }
// var pick = function (caseData, functionData) {
//     switch (caseData) {
//         case 'spotify-this-song':
//             getMeSpotify(functionData);
//             break;
//         default:
//             console.log('LIRI does not know that');
//     }
// }
