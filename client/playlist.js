var socket = io();
var playlist = [];
socket.on("conMade", function () {
    console.log('comMade');
});
socket.emit('playlistRequest');
socket.on('playlistResponse', function (data) {
    console.log('recieved data');
    playlist = data;
    displayPlaylist();
})

function displayPlaylist() {
    document.getElementById('list').innerHTML = "";
    console.log('displaying playlist');
    for (var i = 0; i < playlist.length; i++) {
        document.getElementById('list').innerHTML += "<div class='song' onClick= 'play(" + '"' + playlist[i] + '"' + ")'id='song" + i + "'>" + playlist[i] + "</div>";
    }
}

function play(song) {
    console.log('playing song ' + song);
    socket.emit('songRequest', song);
}