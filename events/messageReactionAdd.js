const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageReactionAdd,
  once:false,
  async execute(reaction, user) {
    if (user.bot) return;

    const guild = reaction.message.guild;
    const role = guild.roles.cache.find((role) => role.name === "member");
    const channel = "1210846594078081084";

    if (reaction.message.channel.id === channel) {
      if (reaction.emoji.name === "✅") {
        await reaction.message.guild.members.cache.get(user.id).roles.add(role);
      }
    }
  },
};
