const { EmbedBuilder, Events } = require("discord.js");

module.exports = {
  name: Events.GuildMemberRemove,
  once:false,
  async execute(guildMember) {
    const displayName = guildMember.displayName;
    const usernameWithTag = guildMember.user.tag;
    const avatarURL = guildMember.user.displayAvatarURL();
    const guildIconURL = guildMember.guild.iconURL({ size: 512 }); // Requesting a larger size for the icon

    const joinServerDate = guildMember.joinedAt;
    const leaveDate = new Date(); // Assuming this event fires immediately upon member leaving
    const durationMs = leaveDate - joinServerDate; // Difference in milliseconds

    // Convert milliseconds to days, hours, minutes, and seconds
    const seconds = Math.floor((durationMs / 1000) % 60);
    const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
    const hours = Math.floor((durationMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));

    const stayDurationString = `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;

    const goodbyeEmbed = new EmbedBuilder()
      .setColor("#ff5555")
      .setTitle(`${displayName} Chose to Suffer`)
      .setDescription("The Choice was clear: Obey or Suffer")
      .setThumbnail(avatarURL)
      .addFields(
        { name: "Display Name", value: displayName },
        { name: "Username", value: usernameWithTag },
        { name: "Joined Server On", value: joinServerDate.toDateString(), inline: true },
        { name: "Stay Duration", value: stayDurationString, inline: true }
      )
      .setImage(guildIconURL) // Using the server icon as the main image
      .setTimestamp()
      .setFooter({
        text: "You will soon face the consequences of leaving ETS",
        iconURL: guildIconURL, // Setting the footer icon to the server icon
      });

    const goodbyeChannel = guildMember.guild.channels.cache.get('1173215123603730500');

    if (goodbyeChannel) {
      goodbyeChannel.send({ embeds: [goodbyeEmbed] });
    }
  },
};
