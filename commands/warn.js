const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'warn',
  description: 'Warns a member in the server.',
  usage: '**!warn @member <reason>**',
  execute(message, args) {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('You do not have permission to use this command.');
    }

    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('Please mention a member to warn.');
    }

    const reason = args.slice(1).join(' ');

    // Save the warning to your preferred storage or logging system

    const warnEmbed = new MessageEmbed()
      .setColor('#FFA500')
      .setTitle('Member Warned')
      .setDescription(`${member.user.tag} has been warned for: ${reason}`)
      .setFooter('AdvanceBot', message.client.user.avatarURL())
      .setTimestamp();

    message.reply({ embeds: [warnEmbed] });
  },
};
