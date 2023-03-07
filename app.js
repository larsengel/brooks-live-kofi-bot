const { Client, GatewayIntentBits } = require('discord.js');

const CHANNEL_ID = '1080770971788660777';
const TOKEN = 'MTA4MjU2OTY0MzY0ODA5NDIxOA.GfZfB4.dpvn2kFLtJyHJ0tr9H0sdi5IMS7l7d7qm3Pt70'
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

const client = new Client({intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]});

let messages;

// get messages from history
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const channel = await client.channels.cache.get(CHANNEL_ID);
    messages = await channel.messages.fetch();
    console.log(`Received ${messages.size} messages`)
});

// listen to when the client is connected
io.on("connection", (socket) => {
    socket.on("cli_connected", (arg) => {
        console.log('Client connected');
        io.sockets.emit('msg_loaded', messages);
    });
});

// listen to new messages and inform client
client.on('messageCreate', msg => {
    if (msg.channel.id === CHANNEL_ID) {
        io.sockets.emit('msg_received', msg);
    }});

// login to discord with bot
client.login(TOKEN);