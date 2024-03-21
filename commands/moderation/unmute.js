module.exports = {
    name: "unmute",
    aliases: ["um"],
    permissions: ["ModerateMembers"], // Ensure only users with permission can use this command
    requiredRoles: [],
    cooldown: 0,
    hidden: false,
    devOnly: false,
    description: "Unmute a user",
    async execute(client, message, args) {
      // Ensure a user is mentioned
      if (!args[0]) return message.reply("Please mention the user you want to unmute.");
  
      const target = message.mentions.members.first();
      if (!target) return message.reply("User not found.");
  
      // Find the "Muted" role in the guild
      const mutedRole = message.guild.roles.cache.find(role => role.name === "Muted");
      if (!mutedRole) return message.reply("Muted role not found. Please check if the 'Muted' role exists.");
  
      // Check if the target user is muted (has the "Muted" role)
      if (!target.roles.cache.has(mutedRole.id)) {
        return message.reply("This user is not muted.");
      }
  
      // Optional: Check if the command issuer has a higher role than the target user
      if (message.member.roles.highest.position <= target.roles.highest.position && message.guild.ownerId !== message.member.id) {
        return message.reply("You cannot unmute someone with an equal or higher role.");
      }
  
      // Remove the "Muted" role from the user
      target.roles.remove(mutedRole).then(() => {
        message.reply(`${target.displayName} has been unmuted.`);
      }).catch(err => {
        console.error(err);
        message.reply("Failed to unmute the user.");
      });
    },
  };
  