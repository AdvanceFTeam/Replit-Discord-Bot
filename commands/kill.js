const axios = require('axios');
const { API_BASE_URL } = require('../config');

module.exports = {
  name: 'kill',
  description: 'Sends a randomly selected kill content.',
  usage: '!kill',
  async execute(message) {
    try {
      const response = await axios.get(`${API_BASE_URL}/img/sfw?type=kill`);
      message.channel.send(response.data.url);
    } catch (error) {
      console.error(error);
      message.channel.send('Failed to fetch kill content.');
    }
  },
};