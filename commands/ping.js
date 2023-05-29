module.exports = {
  name: 'ping',
  description: "Checks the bot's latency and API response time.",
  usage: '**!ping**',
  execute(message) {
    const startTime = Date.now();
    message.channel.send('Pinging...')
      .then((sentMessage) => {
        const endTime = Date.now();
        const pingEmbed = {
          color: '#0099ff',
          title: 'Pong! 🏓',
          description: `Bot Latency: ${endTime - startTime}ms\nAPI Latency: ${Math.round(message.client.ws.ping)}ms`,
          timestamp: new Date(),
          footer: {
            text: 'AdvanceBot',
            icon_url: message.client.user.avatarURL(),
          },
        };

        sentMessage.edit({ content: '\u200B', embeds: [pingEmbed] });
      })
      .catch(console.error);
  },
};
