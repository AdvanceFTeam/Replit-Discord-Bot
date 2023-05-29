const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Displays a list of available commands and their usage.',
  usage: '**!help**',
  execute(message, args, commands) {
    const commandArray = Array.from(commands.values());
    const pageSize = 5;
    const totalPages = Math.ceil(commandArray.length / pageSize);
    let currentPage = 1;

    const generateCommandList = () => {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const visibleCommands = commandArray.slice(startIndex, endIndex);

      // Generate a formatted string for each command with its name, description, and usage
      const commandDescriptions = visibleCommands.map((command) => {
        const description = command.description || 'No description provided.';
        const usage = command.usage || 'No usage information provided.';
        return `**${command.name}**\nDescription: ${description}\nUsage: ${usage}\n`;
      });

      return commandDescriptions.join('\n');
    };

    const updateHelpMessage = async (helpMessage) => {
      const commandList = generateCommandList();

      // Create a message embed to display the command list
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Command List')
        .setDescription(`Here is a list of available commands and their usage:\n\n${commandList}`)
        .setFooter(`Page ${currentPage}/${totalPages}`);

      // Create button components for pagination
      const buttonRow = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('previous')
            .setLabel('Previous')
            .setStyle('PRIMARY')
            .setEmoji('⬅️')
            .setDisabled(currentPage === 1),
          new MessageButton()
            .setCustomId('next')
            .setLabel('Next')
            .setStyle('PRIMARY')
            .setEmoji('➡️')
            .setDisabled(currentPage === totalPages)
        );

      // Update the help message with the new embed and button row
      await helpMessage.edit({ embeds: [embed], components: [buttonRow] });
    };

    // Initial setup: show loading and prepare the command list message
    message.channel.send('Loading commands...').then(async (loadingMessage) => {
      await loadingMessage.delete();

      const helpMessage = await message.channel.send('Preparing command list...');

      updateHelpMessage(helpMessage);

      // Create a collector to handle button interactions
      const filter = (interaction) => {
        return ['previous', 'next'].includes(interaction.customId) && interaction.user.id === message.author.id;
      };

      const collector = helpMessage.createMessageComponentCollector({ filter, time: 60000 });

      collector.on('collect', async (interaction) => {
        // Handle previous and next button clicks to navigate through pages
        if (interaction.customId === 'previous' && currentPage > 1) {
          currentPage--;
        } else if (interaction.customId === 'next' && currentPage < totalPages) {
          currentPage++;
        }

        await interaction.deferUpdate();
        updateHelpMessage(helpMessage);
      });

      collector.on('end', () => {
        // Disable the previous and next buttons after the collector ends
        const disableButtonRow = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId('previous')
              .setLabel('Previous')
              .setStyle('PRIMARY')
              .setEmoji('⬅️')
              .setDisabled(true),
            new MessageButton()
              .setCustomId('next')
              .setLabel('Next')
              .setStyle('PRIMARY')
              .setEmoji('➡️')
              .setDisabled(true)
          );
        helpMessage.edit({ components: [disableButtonRow] }).catch(console.error);
      });

      // Create the previous and next buttons with initial state
      const previousButton = new MessageButton()
        .setCustomId('previous')
        .setLabel('Previous')
        .setStyle('PRIMARY')
        .setEmoji('⬅️')
        .setDisabled(currentPage === 1);

      const nextButton = new MessageButton()
        .setCustomId('next')
        .setLabel('Next')
        .setStyle('PRIMARY')
        .setEmoji('➡️')
        .setDisabled(currentPage === totalPages);

      // Create the button row with the previous and next buttons
      const buttonRow = new MessageActionRow().addComponents(previousButton, nextButton);

      // Update the help message with the button row
      helpMessage.edit({ components: [buttonRow] }).catch(console.error);
    });
  },
};
