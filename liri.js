require("dotenv").config();

// hook up liri bot with twitter key by requiring
// the ./ below tells javascript to look for the keys.js file
var keys = require('./keys.js');
var axios = require("axios")
var Spotify = require('node-spotify-api');

// next, look up twitter npm package to see how to install

// var spotify = new Spotify({
//     id: keys.id,
//     secret: keys.secret
// });


// command line
var cmd = process.argv[2]
var topic = process.argv.slice(3).join(" ")
console.log(cmd, topic)

switch (cmd) {
    case "concert-this":
        concertQuery();
        break;
    case "spotify-this-song":
        songQuery();
        break;
    case "movie-this":
        movieQuery();
        break;
    case "d0-what-it-says":
        fileQuery();
        break;
    default:

        console.log("I don't know what you want")
}

function concertQuery() {

    var query = "https://rest.bandsintown.com/artists/" + topic + "/events?app_id=codingbootcamp"
    axios.get(query).then(function (response) {
        console.log(response.data[0])
        var places = response.data
        for(var i=0; i<places.length;i++) {
            console.log(places[i].venue.name,places[i].venue.city,places[i].venue.country, places[i].datetime)
        }

    })
}
var getArtistNames = function (artist) {
    return artist.name;
}
{/* have spotify call out a song name when searched
then tell the query to input the song name inside the function */}
var getMeSpotify = function (songName) {

    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return
        }

        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artist.map(
                getArtistNAmes
            ));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('----------------------');


        }

        console.log(data.tracks.items[0]);
    });
}
var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        default:
            console.log('LIRI does not know that');
    }
}
