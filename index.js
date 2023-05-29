const fs = require('fs');
const { Client, Intents } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Map();

// Read all command files from the 'commands' directory and add them to the client's commands collection
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const { token, prefix } = require('./config');
const keepAlive = require('./keep_alive');

// Event handler for when the bot is ready
client.once('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}`);

  // Set the bot's status
  client.user.setActivity('Try my command: !help', {
    type: 'PLAYING',
    status: 'online',
    afk: false,
  });
});

// Event handler for incoming messages
client.on('messageCreate', message => {
  // Ignore messages that don't start with the command prefix or are sent by bots
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Check if the command exists in the client's commands collection
  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    // Execute the command and pass client.commands as the third argument
    command.execute(message, args, client.commands);
  } catch (error) {
    console.error(error);
    message.reply('There was an error while executing the command.');
  }
});

keepAlive(); // Call the keepAlive function to start the server

// Log in the bot using the provided token
client.login(token)
  .then(() => {
    console.log('Bot logged in successfully.');
  })
  .catch(error => {
    console.error('Failed to log in the bot:', error);
  });
