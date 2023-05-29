const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kicks a member from the server.',
  usage: '**!kick @member**',
  execute(message, args) {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      return message.reply('You do not have permission to use this command.');
    }

    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('Please mention a member to kick.');
    }

    if (!member.kickable) {
      return message.reply('Unable to kick the mentioned member.');
    }

    member
      .kick()
      .then(() => {
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
