const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  cooldown: 0,
  permissions:['Administrator'],
  requiredRoles: [],
  devOnly:false,
  hidden:false,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong"),
  async execute(client, interaction) {
    await interaction.reply("pong");
  },
};
