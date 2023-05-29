const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { API_BASE_URL } = require('../config');

module.exports = {
  name: 'toys',
  description: '**(NSFW)** Returns a randomly selected toys content.',
  usage: '**!toys**',
  execute(message) {
    if (!message.channel.nsfw) {
      return message.reply('This command can only be used in NSFW channels.');
    }

    axios.get(`${API_BASE_URL}/img/nsfw?type=toys`)
      .then(response => {
        const nsfwContent = response.data;
        const embed = new MessageEmbed()
          .setTitle('NSFW Content - Toys')
          .setDescription('Note: Certain images or gifs may not be displayed due to possible deletion or slow loading times.')
          .setImage(nsfwContent.url)
          .setURL(nsfwContent.url) // Set the URL to the original image for direct access
          .setColor('#FF0000');
        message.channel.send({ embeds: [embed] });
      })
      .catch(error => {
        console.error(error);
        message.channel.send('Failed to fetch NSFW content.');
      });
  },
};
