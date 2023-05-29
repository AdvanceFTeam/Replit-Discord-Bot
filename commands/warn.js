const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'warn',
  description: 'Warns a member in the server.',
  usage: '**!warn @member <reason>**',
  execute(message, args) {
    // Check if the user executing the command has the MANAGE_MESSAGES permission
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('You do not have permission to use this command.');
    }

    // Get the first mentioned member in the message
    const member = message.mentions.members.first();
    if (!member) {
      // If no member is mentioned, ask the user to mention a member
      return message.reply('Please mention a member to warn.');
    }

    // Get the reason for the warning from the command arguments
    const reason = args.slice(1).join(' ');

    // Save the warning to your preferred storage or logging system
    // Implement your logic here to store or log the warning information

    // Create an embed message to notify that the member has been warned
    const warnEmbed = new MessageEmbed()
      .setColor('#FFA500')
      .setTitle('Member Warned')
      .setDescription(`${member.user.tag} has been warned for: ${reason}`)
      .setFooter('AdvanceBot', message.client.user.avatarURL())
      .setTimestamp();

    message.reply({ embeds: [warnEmbed] });
  },
};
