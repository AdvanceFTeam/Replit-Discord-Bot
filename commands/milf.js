const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { API_BASE_URL } = require('../config');

module.exports = {
  name: 'milf',
  description: '**(NSFW)** Returns a randomly selected milf content.',
  usage: '**!milf**',
  execute(message) {
    // Check if the channel where the command is used is NSFW
    if (!message.channel.nsfw) {
      return message.reply('This command can only be used in NSFW channels.');
    }

    // Make a GET request to the API to fetch a random NSFW milf content
    axios.get(`${API_BASE_URL}/img/nsfw?type=milf`)
      .then(response => {
        const nsfwContent = response.data;

        // Create an embed message to display the NSFW content
        const embed = new MessageEmbed()
          .setTitle('NSFW Content - Milf')
          .setDescription('Note: Certain images or gifs may not be displayed due to possible deletion or slow loading times.')
          .setImage(nsfwContent.url)
          .setURL(nsfwContent.url) // Set the URL to the original image for direct access
          .setColor('#FF0000');

        // Send the embed message to the channel
        message.channel.send({ embeds: [embed] });
      })
      .catch(error => {
        console.error(error);
        message.channel.send('Failed to fetch NSFW content.');
      });
  },
};
