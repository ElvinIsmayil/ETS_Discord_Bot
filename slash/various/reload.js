const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads a command")
    .addStringOption((option) =>
      option
        .setName("path")
        .setDescription("Path to a command")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("command").setDescription("Command name").setRequired(true)
    ),

  async execute(client, interaction) {
    const commandPath =
      "../" + interaction.options.getString("path", true).toLowerCase();
    const commandName = interaction.options
      .getString("command", true)
      .toLowerCase();
    const command = interaction.client.slashCommands.get(commandName);

    if (!command) {
      return interaction.reply(
        `There is no command with name \`${commandName}\` `
      );
    }

    delete require.cache[
      require.resolve(`${commandPath}/${command.data.name}.js`)
    ];

    try {
      interaction.client.slashCommands.delete(command.data.name);
      const newCommand = require(`${commandPath}/${command.data.name}.js`);
      interaction.client.slashCommands.set(newCommand.data.name, newCommand);
      await interaction.reply(
        `Command \`${newCommand.data.name}\` was reloaded`
      );
    } catch (error) {
      console.error(error);
      await interaction.reply(
        `There was an error while reloading a command \`${command.data.name}\` :\n\`${error.message}\``
      );
    }
  },
};
