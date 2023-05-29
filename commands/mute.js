const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'mute',
  description: 'Mutes a member in the server.',
  usage: '**!mute @member**',
  execute(message, args) {
    // Check if the user executing the command has the MUTE_MEMBERS permission
    if (!message.member.permissions.has('MUTE_MEMBERS')) {
      return message.reply('You do not have permission to use this command.');
    }

    // Get the first mentioned member in the message
    const member = message.mentions.members.first();
    if (!member) {
      // If no member is mentioned, ask the user to mention a member
      return message.reply('Please mention a member to mute.');
    }

    // Find the 'Muted' role in the guild's role cache
    const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    if (!muteRole) {
      // If the 'Muted' role doesn't exist, ask the user to create it
      return message.reply('The "Muted" role does not exist. Please create it.');
    }

    // Add the 'Muted' role to the mentioned member
    member.roles.add(muteRole)
      .then(() => {
        // Create an embed message to notify that the member has been muted
        const muteEmbed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Member Muted')
          .setDescription(`${member.user.tag} has been muted.`)
          .setFooter('AdvanceBot', message.client.user.avatarURL())
          .setTimestamp();

        message.reply({ embeds: [muteEmbed] });
      })
      .catch(error => {
        console.error(error);
        message.reply('There was an error while muting the member.');
      });
  },
};
