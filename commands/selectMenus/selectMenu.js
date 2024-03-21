const {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  name: "selectmenu",
  description: "Select menu sample",
  permissions: ["Administrator"],
  requiredRoles: [],
  cooldown: 0,
  hidden: true,
  devOnly: false,
  execute(client, message) {
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("selectmenu")
      .setPlaceholder("Placeholder")
      .setDisabled(false)
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Option 1")
          .setValue("option1")
          .setDescription("Description 1")
          .setEmoji("✅"),

        new StringSelectMenuOptionBuilder()
          .setLabel("Option 2")
          .setValue("option2")
          .setDescription("Description 2")
          .setEmoji("✖️")
      );

    const row = new ActionRowBuilder().addComponents(selectMenu);

    message.channel.send({
      content: "Select menu sample",
      components: [row],
    });
  },
};
