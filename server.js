
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var shell = require('shelljs');
var playlist = [];
var playing = 0;
var playingNow = 0;
const audioFolder = 'audio/';
const fs = require('fs');
//fs.readdirSync('audioFresh/').forEach(function (file) {
//	console.log('sox "audioFresh/'+file+'" audio/' + file.substring(0, file.indexOf(".mp3")) + '.wav"')
 // console.log(shell.exec('sox "audioFresh/'+file+'" "audio/' + file.substring(0, file.indexOf(".mp3")) + '.wav"'));
//  console.log(shell.exec('sudo rm "audioFresh/'+file+'"'));	
//})
fs.readdirSync(audioFolder).forEach(function (file) {
	console.log('sudo mv "audio/'+file+'" " audio/'+replace(file)+'"');
// console.log( shell.exec('sudo mv "audio/'+file+'" "audio/'+replace(file)+'"')); 
  playlist.push(replace(file));
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
    });
    socket.on("songRequest", function (song) {
        console.log('song requested, playing now');
        play(song);
    });
    socket.on('playpause', function(){
		console.log('play/pausing')
		if(playing) pause();
		else cont();
	});
    socket.on('back', function(){
	if(playingNow) 
		play(playlist[playingNow-1]);
	else
		play(playlist[playlist.length-1]);
	});
   socket.on('forward', function(){
	if(playingNow != playlist.length-1)
		play(playlist[playingNow+1]);
	else
		play(playlist[0]);
});
  socket.on('shuffle',function(){
	shuffle(playlist);
	play(playlist[0]);
});
  socket.on('list', function(){
       playlist.sort();
       play(playlist[0]);
});
});

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function replace(str){
	var result = "";	
	for(var i = 0; i < str.length; i++)
		if(str[i]==' ') 
			result+='_';
		else 
			result+= str[i];	
	console.log(result);
	return result;
}

function cont(){
	shell.exec('pkill -CONT sox ');
	playing = 1;
}
function pause(){
	shell.exec('pkill -STOP sox');
	playing = 0;
}

function play(song) {
    playingNow = playlist.indexOf(song);
    shell.exec('pkill sox');
    console.log("playing song " + song);
    var com = 'lxterminal -t "play" -e \'bash -c \"cd /home/pi ;sox Documents\/AutoAudioSystem-master\/audio/'+song+' -r 22050 -c 1 -b 16 -t wav - | sudo .\/Documents\/AutoAudioSystem-master\/fm_transmitter -f 103.0 -; read x\"\'';
    shell.exec(com);
}
