const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("options")
    .setDescription("Shows the options for the bot")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The target user")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option.setName("role").setDescription("The role").setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addMentionableOption((option) =>
      option.setName("mention").setDescription("The mention").setRequired(true)
    )
    .addAttachmentOption((option) =>
      option
        .setName("atttachment")
        .setDescription("The attachment")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("string").setDescription("The string").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("choices")
        .setDescription("Choose something")
        .setRequired(true)
        .addChoices(
          {
            name: "Choice 1",
            value: "1",
          },
          {
            name: "Choice 2",
            value: "2",
          }
        )
    )
    .addBooleanOption((option) =>
      option.setName("bool").setDescription("The boolean")
    ),

  async execute(client, interaction) {
    const target = interaction.options.getUser("target");
    const role = interaction.options.getRole("role");
    const channel = interaction.options.getChannel("channel");
    const mention = interaction.options.getMentionable("mention");
    const attachment = interaction.options.getAttachment("attachment").name;
    const string = interaction.options.getString("string");
    const choices = interaction.options.getString("choices");
    const bool = interaction.options.getBoolean("bool");

    await interaction.reply(
      `Options test ${target},${role},${channel},${mention},${attachment},${string},${choices},${bool}`
    );
  },
};
