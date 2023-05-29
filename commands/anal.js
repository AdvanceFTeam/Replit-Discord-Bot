const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { API_BASE_URL } = require('../config');

module.exports = {
  name: 'anal',
  description: '**(NSFW)** Returns a randomly selected anal content.',
  usage: '**!anal**',
  execute(message) {
    // Check if the command is used in an NSFW channel
    if (!message.channel.nsfw) {
      return message.reply('This command can only be used in NSFW channels.');
    }

    // Make a GET request to the API to fetch NSFW content of type "anal"
    axios.get(`${API_BASE_URL}/img/nsfw?type=anal`)
      .then(response => {
        const nsfwContent = response.data;

        // Create a new MessageEmbed to display the NSFW content
        const embed = new MessageEmbed()
          .setTitle('NSFW Content - Anal')
          .setDescription('Note: Certain images or gifs may not be displayed due to possible deletion or slow loading times.')
          .setImage(nsfwContent.url)
          .setURL(nsfwContent.url) // Set the URL to the original image for direct access
          .setColor('#FF0000');

        // Send the embed to the channel where the command was used
        message.channel.send({ embeds: [embed] });
      })
      .catch(error => {
        console.error(error);
        message.channel.send('Failed to fetch NSFW content.');
      });
  },
};
