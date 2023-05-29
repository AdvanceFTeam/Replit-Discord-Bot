module.exports = {
  name: 'purge',
  description: 'Deletes a specified number of messages in the channel.',
  usage: '**!purge <amount>**',
  execute(message, args) {
    // Check if the user has the required permission
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('You do not have permission to use this command.');
    }

    // Check if the amount is a valid number
    const amount = parseInt(args[0]);
    if (isNaN(amount) || !Number.isInteger(amount) || amount <= 0) {
      return message.reply('Please provide a valid positive integer as the amount of messages to delete.');
    }

    // Limit the amount to a reasonable range
    const maxAmount = 100;
    if (amount > maxAmount) {
      return message.reply(`Please provide a number between 1 and ${maxAmount} as the amount of messages to delete.`);
    }

    // Delete the specified number of messages
    message.channel.bulkDelete(amount, true)
      .then((deletedMessages) => {
        const deletedCount = deletedMessages.size;
        message.channel
          .send(`Successfully deleted ${deletedCount} message(s).`)
          .then((reply) => {
            // Delete the success message after a certain amount of time (in this case, 5 seconds)
            reply.delete({ timeout: 5000 }).catch(console.error);
          })
          .catch(console.error);
      })
      .catch((error) => {
        console.error('Error while trying to delete messages:', error);
        message.reply('An error occurred while trying to delete messages. Please try again later.');
      });
  },
};
