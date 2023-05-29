const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { API_BASE_URL } = require('../config');

module.exports = {
  name: 'boobs',
  description: '**(NSFW)** Returns a randomly selected boobs content.',
  usage: '**!boobs**',
  execute(message) {
    // Check if the command is used in an NSFW channel
    if (!message.channel.nsfw) {
      return message.reply('This command can only be used in NSFW channels.');
    }

    // Make a GET request to the API to fetch NSFW content
    axios.get(`${API_BASE_URL}/img/nsfw?type=boobs`)
      .then(response => {
        const nsfwContent = response.data;

        // Create a message embed to send the NSFW content
        const embed = new MessageEmbed()
          .setTitle('NSFW Content - Boobs')
          .setDescription('Note: Certain images or gifs may not be displayed due to possible deletion or slow loading times.')
          .setImage(nsfwContent.url)
          .setURL(nsfwContent.url) // Set the URL to the original image for direct access
          .setColor('#FF0000');

        // Send the message embed containing the NSFW content
        message.channel.send({ embeds: [embed] });
      })
      .catch(error => {
        console.error(error);
        message.channel.send('Failed to fetch NSFW content.');
      });
  },
};
