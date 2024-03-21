const { EmbedBuilder, Events } = require("discord.js");

module.exports = {
  name: Events.GuildMemberAdd,
  once:false,
  async execute(guildMember) {
    await guildMember.fetch();

    const joinDiscordDate = guildMember.user.createdAt;
    const joinServerDate = guildMember.joinedAt;
    const displayName = guildMember.displayName;
    const usernameWithTag = guildMember.user.tag;
    const avatarURL = guildMember.user.displayAvatarURL();
    const guildIconURL = guildMember.guild.iconURL({ size: 512 }); // Requesting a larger size for the icon

    // Calculate account age
    const now = new Date();
    const accountAgeMs = now - joinDiscordDate; // Difference in milliseconds
    const accountAgeSeconds = Math.floor(accountAgeMs / 1000);
    const accountAgeMinutes = Math.floor(accountAgeSeconds / 60);
    const accountAgeHours = Math.floor(accountAgeMinutes / 60);
    const days = Math.floor(accountAgeHours / 24);
    const hours = accountAgeHours % 24;
    const minutes = accountAgeMinutes % 60;
    const seconds = accountAgeSeconds % 60;

    const accountAgeString = `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;

    const welcomeEmbed = new EmbedBuilder()
      .setColor("#304281")
      .setTitle("Welcome to the ETS Corporation!")
      .setThumbnail(avatarURL)
      .addFields(
        { name: "Display Name", value: displayName },
        { name: "Username", value: usernameWithTag },
        { name: "Joined Discord On", value: joinDiscordDate.toDateString(), inline: true },
        { name: "Joined Server On", value: joinServerDate.toDateString(), inline: true },
        { name: "Account Age", value: accountAgeString } // Displaying the accurate account age
      )
      .setImage(guildIconURL) // Using the server icon as the main image
      .setTimestamp()
      .setFooter({
        text: "The choice is clear: Obey or Suffer",
        iconURL: guildIconURL, // Setting the footer icon to the server icon
      });

    const welcomeRole = guildMember.guild.roles.cache.find(role => role.name === "🙋| Citizen");
    const welcomeChannel = guildMember.guild.channels.cache.get('1173215123603730500');

    if (welcomeChannel) {
      welcomeChannel.send({ embeds: [welcomeEmbed] });
    }

    if (welcomeRole) {
      guildMember.roles.add(welcomeRole).catch(console.error);
    } else {
      console.log("Role not found");
    }
  },
};
