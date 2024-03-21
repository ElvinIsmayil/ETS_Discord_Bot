module.exports = {
  name: "clear",
  aliases: ["c"],
  permissions: ["Administrator"],
  requiredRoles: [],
  cooldown: 0,
  hidden: false,
  devOnly: false,
  description: "Clear messages",
  async execute(client, message, args) {
    if (!args[0]) {
      return message.reply("Enter the amount of messages you want to clear");
    }

    if (isNaN(args[0])) return message.reply("Please enter a number");

    if (parseInt(args[0]) > 30) {
      return message.reply("You can delete up to 30 messages at a time");
    }

    if (parseInt(args[0]) < 1)
      return message.reply("You must delete at least one message");

    await message.channel.messages
      .fetch({ limit: parseInt(args[0], 10) })
      .then((messages) => {
        const currentTime = new Date();
        const cutoffTimestamp =
          currentTime.getTime() - 14 * 24 * 60 * 60 * 1000;
        const messagesToDelete = messages.filter(
          (msg) => msg.createdTimestamp >= cutoffTimestamp
        );

        if (messagesToDelete.size === 0) {
          message.reply(
            "There are no messages that can be deleted (messages older than 14 days cannot be deleted)."
          );
          return;
        }

        message.channel.bulkDelete(messagesToDelete, true).catch((err) => {
          console.error(err);
          message.reply("An error occurred while trying to delete messages.");
        });
      })
      .catch((err) => {
        console.error(err);
        message.reply("Failed to fetch messages.");
      });
  },
};
