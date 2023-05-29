const axios = require('axios');
const { API_BASE_URL } = require('../config');

module.exports = {
  name: 'meme',
  description: 'Sends a randomly selected meme content.',
  usage: '**!meme**',
  async execute(message) {
    try {
      // Make a GET request to the API endpoint to fetch a meme
      const response = await axios.get(`${API_BASE_URL}/img/sfw?type=meme`);

      // Send the URL of the meme as a message in the channel
      message.channel.send(response.data.url);
    } catch (error) {
      console.error(error);
      // If there is an error during the request, log the error to the console
      // and send a failure message to the channel
      message.channel.send('Failed to fetch meme.');
    }
  },
};
