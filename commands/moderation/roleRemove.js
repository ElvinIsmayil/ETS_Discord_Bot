module.exports = {
  name: "roleremove",
  description: "Remove role from a member",
  permissions: ["Administrator"],
  requiredRoles: [],
  cooldown: 0,
  hidden: false,
  devOnly: false,
  async execute(client, message, args) {
    // Check if the message has the correct number of mentions for user and role
    if (
      message.mentions.users.size === 0 ||
      message.mentions.roles.size === 0
    ) {
      return message.reply("Please mention a user and a role.");
    }

    // Get the first mentioned user and role from the message
    const member = message.mentions.members.first();
    const role = message.mentions.roles.first();

    // Remove the role from the member
    member.roles
      .remove(role)
      .then(() => {
        message.reply(
          `**${role.name}** was removed from **${member.user.username}**.`
        );
      })
      .catch((error) => {
        console.error(error);
        message.reply("Failed to remove the role.");
      });
  },
};
