module.exports = {
  name: 'ping',
  description: 'Checks the bot\'s latency and API response time.',
  usage: '!ping',
  execute(message) {
    const pingEmbed = {
      color: '#0099ff',
      title: 'Pong! 🏓',
      description: `Latency: ${Date.now() - message.createdTimestamp}ms\nAPI Latency: ${Math.round(message.client.ws.ping)}ms`,
      timestamp: new Date(),
      footer: {
        text: 'AdvanceBot',
        icon_url: message.client.user.avatarURL(),
      },
    };

    message.channel.send({ embeds: [pingEmbed] });
  },
};
