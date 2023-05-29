const axios = require('axios');
const { API_BASE_URL } = require('../config');

module.exports = {
  name: 'hug',
  description: 'Sends a randomly selected hug content.',
  usage: '**!hug**',
  async execute(message) {
    try {
      const response = await axios.get(`${API_BASE_URL}/img/sfw?type=hug`);
      message.channel.send(response.data.url);
    } catch (error) {
      console.error(error);
      message.channel.send('Failed to fetch hug content.');
    }
  },
};
