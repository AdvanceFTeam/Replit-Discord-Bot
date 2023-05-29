module.exports = {
  name: 'ping',
  description: "Checks the bot's latency and API response time.",
  usage: '**!ping**',
  execute(message) {
    // Record the start time before sending the message
    const startTime = Date.now();

    // Send a message to indicate that the bot is being pinged
    message.channel.send('Pinging...')
      .then((sentMessage) => {
        // Calculate the end time after the message is sent
        const endTime = Date.now();

        // Create an embed object to display the ping information
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

        // Edit the original message with the ping information embedded
        sentMessage.edit({ content: '\u200B', embeds: [pingEmbed] });
      })
      .catch(console.error);
  },
};
