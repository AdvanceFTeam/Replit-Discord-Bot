const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'memberinfo',
  description: 'Displays information about a member.',
  usage: '**!memberinfo @member**',
  execute(message, args) {
    const member = message.mentions.members.first() || message.member;

    const embed = new MessageEmbed()
      .setColor('#7289DA')
      .setTitle('Member Information')
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addField('User', member.user.tag, true)
      .addField('ID', member.id, true)
      .addField('Nickname', member.nickname || 'None', true)
      .addField('Joined Server', formatDate(member.joinedAt), true)
      .addField('Joined Discord', formatDate(member.user.createdAt), true)
      .addField('Roles', getMemberRoles(member), false)
      .setFooter('AdvanceBot', message.client.user.avatarURL())
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);
}

function getMemberRoles(member) {
  const roles = member.roles.cache.filter(role => role.name !== '@everyone').map(role => role.name);
  return roles.length ? roles.join('\n') : 'None';
}
