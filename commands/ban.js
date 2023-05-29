// Ban Command
module.exports = {
  name: 'ban',
  description: 'Bans a member from the server.',
  usage: '!ban @member',
  execute(message, args) {
    if (!message.member.permissions.has('BAN_MEMBERS'))
      return message.reply('You do not have permission to use this command.');

    const member = message.mentions.members.first();
    if (!member)
      return message.reply('Please mention a member to ban.');

    if (!member.bannable)
      return message.reply('Unable to ban the mentioned member.');

    member
      .ban()
      .then(() => {
        message.reply(`Successfully banned ${member.user.tag}.`);
      })
      .catch(error => {
        console.error(error);
        message.reply('There was an error while banning the member.');
      });
  },
};