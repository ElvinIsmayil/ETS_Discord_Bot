const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get detailed help about a specific command")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("kick")
        .setDescription("Provides help for the kick command")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("ban")
        .setDescription("Provides help for the ban command")
    ),
  async execute(client, interaction) {
    if (interaction.options.getSubcommand() === "kick") {
      await interaction.reply("Kicks the member from the server");
    } else if (interaction.options.getSubcommand() === "ban") {
      await interaction.reply("Bans the member from the server");
    }
  },
};
