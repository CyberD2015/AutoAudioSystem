var playlist = [];
var socket = io();

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
    document.getElementById('playlist').innerHTML = "";
    console.log('displaying playlist');
    for (var i = 0; i < playlist.length; i++) {
        document.getElementById('playlist').innerHTML += "<div class='song' onClick= 'play(" + '"' + playlist[i] + '"' + ")'id='song" + i + "'>" + playlist[i] + "</div>";
    }
}

function play(song) {
    console.log('playing song ' + song);
    socket.emit('songRequest', song);
}
document.getElementById('back').onclick = function () {
    socket.emit('back');
}
document.getElementById('forward').onclick = function () {
    socket.emit('forward');
}
document.getElementById('playpause').onclick = function () {
    socket.emit('playpause');
}
document.getElementById('list').onclick = function () {
    socket.emit('list');
    document.getElementById('shuffle').className = "iconToggle off";
    document.getElementById('list').className = "iconToggle on";
}
document.getElementById('shuffle').onclick = function () {
    socket.emit('shuffle');
    document.getElementById('list').className = "iconToggle off";
    document.getElementById('shuffle').className = "iconToggle on";
}
