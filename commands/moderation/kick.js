module.exports = {
  name: "kick",
  description: "Kicks a member",
  permissions: ["Administrator"],
  requiredRoles: [],
  cooldown: 0,
  hidden: false,
  devOnly: false,
  execute(client, message) {
    const member = message.mentions.users.first();
    if (member) {
      const memberTarget = message.guild.members.cache.get(member.id);
      memberTarget.kick();
      message.reply(` **${member.displayName}** has been successfully kicked`);
    } else {
      message.reply("You could not kick **${member.displayName}**");
    }
  },
};
