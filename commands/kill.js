const axios = require('axios');
const { API_BASE_URL } = require('../config');

module.exports = {
  name: 'kill',
  description: 'Sends a randomly selected kill content.',
  usage: '**!kill**',
  async execute(message) {
    try {
      // Send a GET request to the API to fetch a randomly selected kill content
      const response = await axios.get(`${API_BASE_URL}/img/sfw?type=kill`);
      
      // Send the URL of the kill content to the channel
      message.channel.send(response.data.url);
    } catch (error) {
      console.error(error);
      message.channel.send('Failed to fetch kill content.');
    }
  },
};
