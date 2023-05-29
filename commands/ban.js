const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Bans a member from the server.',
  usage: '**!ban @member**',
  execute(message, args) {
    // Check if the user has the necessary permissions to use the command
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.reply('You do not have permission to use this command.');
    }

    // Mentioned member to be banned
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('Please mention a member to ban.');
    }

    // Check if the mentioned member is bannable
    if (!member.bannable) {
      return message.reply('Unable to ban the mentioned member.');
    }

    // Ban the member
    member
      .ban()
      .then(() => {
        // Create a ban embed message to send as a reply
        const banEmbed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Member Banned')
          .setDescription(`${member.user.tag} has been banned from the server.`)
          .setFooter('AdvanceBot', message.client.user.avatarURL())
          .setTimestamp();

        // Send the ban embed message as a reply
        message.reply({ embeds: [banEmbed] });
      })
      .catch(error => {
        console.error(error);
        message.reply('There was an error while banning the member.');
      });
  },
};

