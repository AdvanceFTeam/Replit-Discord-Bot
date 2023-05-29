const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kicks a member from the server.',
  usage: '**!kick @member**',
  execute(message, args) {
    // Check if the user executing the command has the necessary permissions (KICK_MEMBERS)
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      return message.reply('You do not have permission to use this command.');
    }

    // Get the mentioned member from the message
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('Please mention a member to kick.');
    }

    // Check if the mentioned member can be kicked
    if (!member.kickable) {
      return message.reply('Unable to kick the mentioned member.');
    }

    // Kick the member
    member
      .kick()
      .then(() => {
        // Create and send an embed message to notify about the kicked member
        const kickEmbed = new MessageEmbed()
          .setColor('#FFA500')
          .setTitle('Member Kicked')
          .setDescription(`${member.user.tag} has been kicked from the server.`)
          .setFooter('AdvanceBot', message.client.user.avatarURL())
          .setTimestamp();

        message.reply({ embeds: [kickEmbed] });
      })
      .catch(error => {
        console.error(error);
        message.reply('There was an error while kicking the member.');
      });
  },
};
