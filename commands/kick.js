// Kick Command
module.exports = {
  name: 'kick',
  description: 'Kicks a member from the server.',
  usage: '!kick @member',
  execute(message, args) {
    if (!message.member.permissions.has('KICK_MEMBERS'))
      return message.reply('You do not have permission to use this command.');

    const member = message.mentions.members.first();
    if (!member)
      return message.reply('Please mention a member to kick.');

    if (!member.kickable)
      return message.reply('Unable to kick the mentioned member.');

    member
      .kick()
      .then(() => {
        message.reply(`Successfully kicked ${member.user.tag}.`);
      })
      .catch(error => {
        console.error(error);
        message.reply('There was an error while kicking the member.');
      });
  },
};