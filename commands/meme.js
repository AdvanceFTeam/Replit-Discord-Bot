const axios = require('axios');
const { API_BASE_URL } = require('../config');

module.exports = {
  name: 'meme',
  description: 'Sends a randomly selected meme content.',
  usage: '!meme',
  async execute(message) {
    try {
      const response = await axios.get(`${API_BASE_URL}/img/sfw?type=meme`);
      message.channel.send(response.data.url);
    } catch (error) {
      console.error(error);
      message.channel.send('Failed to fetch meme.');
    }
  },
};
