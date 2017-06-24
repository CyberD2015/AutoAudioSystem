var playlist = [];
var socket = io.connect('http://10.1.220.19:4200');
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
socket.on('connect', function (data) {
    socket.emit('join', 'Hello World from client');
});
socket.emit('playlistRequest');
socket.on('playlistResponse', function (data) {
    console.log('recieved data');
    playlist = data;
    displayPlaylist();
})

function displayPlaylist() {
    console.log('displaying playlist');
    for (var i = 0; i < playlist.length; i++) {
        document.getElementById('list').innerHTML += "div class='song' id='song" + i + "'>music.mp4</div>"
        document.getElementById("song" + i).addEventListener("click", play(playlist[i]));
    }
}

function play(song) {
    socket.emit('requestSong', song);
}