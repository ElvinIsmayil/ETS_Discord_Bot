module.exports = {
    name: "timeout",
    aliases: ["to"],
    permissions: ["ModerateMembers"], // Ensure only users with permission can use this command
    requiredRoles: [],
    cooldown: 0,
    hidden: false,
    devOnly: false,
    description: "Put a user in timeout",
    async execute(client, message, args) {
      // Ensure a user is mentioned
      if (!args[0]) return message.reply("Please mention the user you want to put in timeout.");
  
      // Duration of the timeout in minutes
      const duration = parseInt(args[1], 10);
      if (isNaN(duration) || duration < 1) return message.reply("Please specify a valid duration in minutes.");
  
      const target = message.mentions.members.first();
      if (!target) return message.reply("User not found.");
  
      // Optional: Check if the command issuer has a higher role than the target user
      if (message.member.roles.highest.position <= target.roles.highest.position && message.guild.ownerId !== message.member.id) {
        return message.reply("You cannot timeout someone with an equal or higher role.");
      }
  
      // Calculate the timeout duration in milliseconds
      const durationMs = duration * 60 * 1000;
  
      // Timeout the user
      target.timeout(durationMs).then(() => {
        message.reply(`${target.displayName} has been put in timeout for ${duration} minute(s).`);
      }).catch(err => {
        console.error(err);
        message.reply("Failed to put the user in timeout.");
      });
    },
  };
  