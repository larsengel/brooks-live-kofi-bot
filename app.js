const Discord = require('discord.js');
const Mustache = require('mustache');

const client = new Discord.Client();

var currentText = "";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.channel.id == '836496910059044864') {
        currentText = msg.content;
    }
});

client.login('ODM2Mjk0NjY3MzU5MjIzODM5.YIb6Gg.HU5XERz8KkiJrZxHVD0-11MtrDM');