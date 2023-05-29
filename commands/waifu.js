const axios = require('axios');
const { API_BASE_URL } = require('../config');

module.exports = {
  name: 'waifu',
  description: 'Sends a randomly selected waifu content.',
  usage: '**!waifu**',
  async execute(message) {
    try {
      // Fetch SFW (Safe for Work) content of type 'waifu' from the API
      const response = await axios.get(`${API_BASE_URL}/img/sfw?type=waifu`);
      message.channel.send(response.data.url);
    } catch (error) {
      console.error(error);
      message.channel.send('Failed to fetch waifu.');
    }
  },
};
