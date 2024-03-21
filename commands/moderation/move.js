const { Collection } = require("discord.js");

module.exports = {
  name: "move",
  description: "Moves a member to a voice channel",
  permissions: ["Administrator"],
  requiredRoles: [],
  cooldown: 0,
  hidden: false,
  devOnly: false,
  async execute(client, message, args) {
    const voiceManager = new Collection();

    try {
      const memberId = args.shift().replace(/[<@!&>]/g, "");
      const channelId = args.shift().replace(/[<@!&>]/g, "");

      const member = message.guild.members.cache.get(memberId);
      const channel = message.guild.channels.cache.get(channelId);

      if (member.voice.channel) {
        voiceManager.set(member.id, channel.id);

        member.voice.setChannel(channel);
        message.reply("Member has been moved successfully");
      } else {
        message.reply("Member is not connected to a voice channel");
      }
    } catch (error) {
      return;
    }
  },
};
