const axios = require('axios');
const { API_BASE_URL } = require('../config');

module.exports = {
  name: 'anime_wallpaper',
  description: 'Sends a randomly selected anime wallpaper image.',
  usage: '**!anime_wallpaper**',
  async execute(message) {
    try {
      const response = await axios.get(`${API_BASE_URL}/img/sfw?type=anime_wallpaper`);
      message.channel.send(response.data.url);
    } catch (error) {
      console.error(error);
      message.channel.send('Failed to fetch anime wallpaper.');
    }
  },
};