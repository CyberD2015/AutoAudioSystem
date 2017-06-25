AutoAudioSystem

Use Raspberry Pi as FM transmitter. 
Works on all RPi boards

Setup

To prepare this project use commands below:
```
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install sox
npm install express
npm install socket.io
npm install shelljs
sudo apt-get install make gcc g++
make
``` 
To start the server use:
```
sudo nodejs server.js
```
This project uses fm_transmitter to transmit audio files to stream music to your car radio.
Since fm_transmitter only accepts .wav files, all files in folder audioFresh are first converted to .wav using mpg123 and then transfered to audio folder.
Once the server is running, you can access the site on the local network(sugest making a hotspot on your RPi) through your Pi's local adress and port 8080.


