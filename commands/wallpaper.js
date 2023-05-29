const axios = require('axios');
const { API_BASE_URL } = require('../config');

module.exports = {
  name: 'wallpaper',
  description: 'Sends a randomly selected wallpaper image.',
  usage: '**!wallpaper**',
  async execute(message) {
    try {
      // Fetch SFW (Safe for Work) wallpaper content from the API
      const response = await axios.get(`${API_BASE_URL}/img/sfw?type=wallpaper`);
      message.channel.send(response.data.url);
    } catch (error) {
      console.error(error);
      message.channel.send('Failed to fetch wallpaper.');
    }
  },
};
