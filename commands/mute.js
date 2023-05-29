const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'mute',
  description: 'Mutes a member in the server.',
  usage: '**!mute @member**',
  execute(message, args) {
    if (!message.member.permissions.has('MUTE_MEMBERS')) {
      return message.reply('You do not have permission to use this command.');
    }

    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('Please mention a member to mute.');
    }

    const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    if (!muteRole) {
      return message.reply('The "Muted" role does not exist. Please create it.');
    }

    member.roles.add(muteRole)
      .then(() => {
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
