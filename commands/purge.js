module.exports = {
  name: 'purge',
  description: 'Deletes a specified number of messages in the channel.',
  usage: '!purge <amount>',
  execute(message, args) {
    // Check if the user has the required permission
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.reply('You do not have permission to use this command.');
    }

    // Check if the amount is a valid number
    const amount = parseInt(args[0]);
    if (isNaN(amount)) {
      return message.reply('Please provide a valid number of messages to delete.');
    }

    // Limit the amount to a reasonable range
    const maxAmount = 100;
    if (amount <= 0 || amount > maxAmount) {
      return message.reply(`Please provide a number between 1 and ${maxAmount}.`);
    }

    // Delete the specified number of messages
    message.channel.bulkDelete(amount)
      .then(deletedMessages => {
        message.reply(`Successfully deleted ${deletedMessages.size} message(s).`).then(reply => {
          reply.delete({ timeout: 5000 });
        });
      })
      .catch(error => {
        console.error('Error while trying to delete messages:', error);
        message.reply('An error occurred while trying to delete messages. Please try again later.');
      });
  },
};
