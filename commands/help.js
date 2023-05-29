module.exports = {
  name: 'help',
  description: 'Displays a list of available commands and their usage.',
  usage: '!help',
  execute(message, args, commands) {
    const importantCommands = ['help', 'kick', 'ban', 'mute', 'purge', 'warn', 'ping']; // Add more important command names here
    const commandArray = Array.from(commands.values()); // Convert commands object to an array
    const apiCommands = commandArray.filter(command => !importantCommands.includes(command.name));
    const importantCommandDescriptions = importantCommands.map(commandName => {
      const command = commandArray.find(cmd => cmd.name === commandName);
      return `**${command.name}**: ${command.description || 'No description provided.'}\n**Usage:** ${command.usage || 'No usage information provided.'}\n`;
    });
    const apiCommandDescriptions = apiCommands.map(command => {
      return `**${command.name}**: ${command.description || 'No description provided.'}\n**Usage:** ${command.usage || 'No usage information provided.'}\n`;
    });

    const helpEmbed = {
      color: '#0099ff',
      title: 'Command List',
      description: 'Here is a list of available commands and their usage:',
      fields: [],
      timestamp: new Date(),
      footer: {
        text: 'AdvanceBot',
        icon_url: message.client.user.avatarURL(),
      },
    };

    if (importantCommandDescriptions.length > 0) {
      const importantCommandsField = {
        name: '**Normal Commands:**\n',
        value: importantCommandDescriptions.join('\n'),
        inline: false,
      };
      helpEmbed.fields.push(importantCommandsField);
    }

    if (apiCommandDescriptions.length > 0) {
      const apiCommandsField = {
        name: '**SFW Commands:**\n',
        value: apiCommandDescriptions.join('\n'),
        inline: false,
      };
      helpEmbed.fields.push(apiCommandsField);
    }

    message.channel.send({ embeds: [helpEmbed] });
  },
};
