var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var shell = require('shelljs');
var playlist = [];
const audioFolder = './audio/';
const fs = require('fs');
fs.readdirSync('./audioFresh/').forEach(function (file) {
    shell.exec('sudo mpg123 -w ./audio/' + file.substring(0, file.indexOf(".mp3")) + '.wav ./audioFresh/' + file);
})
fs.readdirSync(audioFolder).forEach(function (file) {
    playlist.push(file);
})
app.use(express.static('client'));
app.get('/', function (req, res) {
    res.send('<h1>...You went too far my friend...Too far...</h1>');
});
http.listen(8080, function () {
    console.log('Listening on *:8080');
});
io.on('connection', function (socket) {
    io.emit('conMade');
    console.log('conMade');
    socket.on('playlistRequest', function () {
        console.log('playlist requested, sending now');
        io.emit('playlistResponse', playlist);
    })
    socket.on("songRequest", function (song) {
        console.log('song requested, playing now');
        play(song);
    })
});

function play(song) {
    console.log("playing song " + song);
    shell.exec('sudo ./fm_transmitter -f 103.3' + song);
}