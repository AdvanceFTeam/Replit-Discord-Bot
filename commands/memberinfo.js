const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'memberinfo',
  description: 'Displays information about a member.',
  usage: '**!memberinfo @member**',
  execute(message, args) {
    // Get the mentioned member or default to the author of the message
    const member = message.mentions.members.first() || message.member;

    // Create a new MessageEmbed to display the member information
    const embed = new MessageEmbed()
      .setColor('#7289DA')
      .setTitle('Member Information')
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true })) // Set the member's avatar as the thumbnail
      .addField('User', member.user.tag, true) // Display the member's username and discriminator
      .addField('ID', member.id, true) // Display the member's ID
      .addField('Nickname', member.nickname || 'None', true) // Display the member's nickname or 'None' if none is set
      .addField('Joined Server', formatDate(member.joinedAt), true) // Display the date the member joined the server
      .addField('Joined Discord', formatDate(member.user.createdAt), true) // Display the date the member joined Discord
      .addField('Roles', getMemberRoles(member), false) // Display the member's roles
      .setFooter('AdvanceBot', message.client.user.avatarURL()) // Set the bot's name as the footer
      .setTimestamp(); // Set the timestamp to the current time

    // Send the embed to the channel
    message.channel.send({ embeds: [embed] });
  },
};

// Function to format the date in a readable format
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);
}

// Function to get the member's roles
function getMemberRoles(member) {
  // Filter out the '@everyone' role and map the remaining roles to an array of role names
  const roles = member.roles.cache.filter(role => role.name !== '@everyone').map(role => role.name);
  return roles.length ? roles.join('\n') : 'None'; // Return the roles joined by a new line, or 'None' if no roles are found
}
