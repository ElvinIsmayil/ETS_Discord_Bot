const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "modal",
  description: "Modal sample",
  permissions: ["Administrator"],
  requiredRoles: [],
  cooldown: 0,
  hidden: false,
  devOnly: false,
  async execute(client, message) {
    const button = new ButtonBuilder()
      .setCustomId("modal")
      .setLabel("Click to open modal")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    if (message.channel) {
      await message.channel.send({
        content: "Modal sample",
        components: [row],
      });
    }
  },
};
