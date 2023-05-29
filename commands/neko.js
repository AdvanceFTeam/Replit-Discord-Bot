const axios = require('axios');
const { API_BASE_URL } = require('../config');

module.exports = {
  name: 'neko',
  description: 'Sends a randomly selected neko content.',
  usage: '**!neko**',
  async execute(message) {
    try {
      // Send a GET request to the API to fetch a random neko content
      const response = await axios.get(`${API_BASE_URL}/img/sfw?type=neko`);

      // Send the neko content URL to the channel
      message.channel.send(response.data.url);
    } catch (error) {
      console.error(error);
      message.channel.send('Failed to fetch neko.');
    }
  },
};
