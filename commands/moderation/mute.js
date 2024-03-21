module.exports = {
  name: "mute",
  aliases: ["m"],
  permissions: ['Administrator'],
  requiredRoles: [],
  cooldown: 0,
  hidden: false,
  devOnly: false,
  description: "Mute a user",
  async execute(client, message, args) {
    if (!args[0])
      return message.reply("Please mention the user you want to mute.");

    const target = message.mentions.members.first();
    if (!target) return message.reply("User not found.");

    // Check if the target user is already muted
    const mutedRole = message.guild.roles.cache.find(
      (role) => role.name === "Muted"
    );
    if (!mutedRole)
      return message.reply(
        "Muted role not found. Please create a 'Muted' role."
      );

    if (target.roles.cache.has(mutedRole.id)) {
      return message.reply("This user is already muted.");
    }

    // Optional: Check for higher role or same role to prevent abuse
    if (
      message.member.roles.highest.position <= target.roles.highest.position
    ) {
      return message.reply(
        "You cannot mute someone with an equal or higher role."
      );
    }

    // Mute the user
    target.roles
      .add(mutedRole)
      .then(() => {
        message.reply(`${target.displayName} has been muted.`);
      })
      .catch((err) => {
        console.error(err);
        message.reply("Failed to mute the user.");
      });
  },
};
