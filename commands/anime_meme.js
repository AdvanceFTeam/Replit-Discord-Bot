const axios = require('axios');
const { API_BASE_URL } = require('../config');

module.exports = {
  name: 'anime_meme',
  description: 'Sends a randomly selected anime meme content.',
  usage: '**!anime_meme**',
  async execute(message) {
    try {
      // Make a GET request to the API to fetch a randomly selected anime meme (safe for work)
      const response = await axios.get(`${API_BASE_URL}/img/sfw?type=anime_meme`);

      // Send the URL of the anime meme as a message to the channel
      message.channel.send(response.data.url);
    } catch (error) {
      console.error(error);
      message.channel.send('Failed to fetch anime meme.');
    }
  },
};
