const Discord = require('discord.js');

// express und http Module importieren. Sie sind dazu da, die HTML-Dateien
// aus dem Ordner "public" zu veröffentlichen.
var express = require('express');
var app = express();
var server = require('http').createServer(app);

// Mit dieser zusätzlichen Zeile bringen wir Socket.io in unseren Server.
var io = require('socket.io')(server);

// Mit diesem Kommando starten wir den Webserver.
var port = process.env.PORT || 3000;
server.listen(port, function () {
// Wir geben einen Hinweis aus, dass der Webserer läuft.
    console.log('Webserver läuft und hört auf Port %d', port);
});

// Hier teilen wir express mit, dass die öffentlichen HTML-Dateien
// im Ordner "public" zu finden sind.
app.use(express.static(__dirname + '/public'));

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    //if (msg.channel.id == '836496910059044864') {
        io.sockets.emit('new message', {
            message: msg.content
        });
    //}
});

client.login('TokenSmoken');