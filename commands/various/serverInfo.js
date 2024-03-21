const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "Displays detailed information about the server.",
  permissions: ["Administrator"],
  requiredRoles: [],
  cooldown: 0,
  hidden: false,
  devOnly: false,
  async execute(client, message){
    const guild = message.guild;
    const owner = await guild.fetchOwner(); // Fetch the owner as a user object

    const serverEmbed = new EmbedBuilder()
      .setColor("#304281") // Embed color
      .setTitle(guild.name) // Server name as title
      .setThumbnail(guild.iconURL() || "") // Server icon
      .addFields(
        { name: "Server ID", value: guild.id, inline: true },
        { name: "Owner", value: owner.user.tag, inline: true }, // Display owner's tag
        { name: "Member Count", value: guild.memberCount.toString(), inline: true },
        { name: "Creation Date", value: guild.createdAt.toDateString(), inline: true },
        { name: "Roles Count", value: guild.roles.cache.size.toString(), inline: true },
        { name: "Emojis Count", value: guild.emojis.cache.size.toString(), inline: true },
        { name: "Boost Level", value: guild.premiumTier.toString(), inline: true },
        { name: "Boost Count", value: guild.premiumSubscriptionCount.toString() || "0", inline: true }
      )
      .setTimestamp()
      .setFooter({
        text: "Server Info",
        iconURL: guild.iconURL() || "",
      });

    // Use .send() with await to handle potential promise rejection
    await message.channel.send({ embeds: [serverEmbed] }).catch(console.error);
  },
};
