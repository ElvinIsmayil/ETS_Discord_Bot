module.exports = {
    name: "tlockr",
    aliases: [],
    permissions: [],
    requiredRoles: [],
    cooldown: 0,
    devOnly: false,
    ownerOnly: false,
    hidden: false,
    description: "Locks a text channel for a role",
  
    async execute(client, message, args) {
      // Assuming the first argument is a role mention
      const roleMention = message.mentions.roles.first();
      if (!roleMention) {
        return message.channel.send("Please mention a valid role.");
      }
  
      // If a channel is mentioned, use it, otherwise use the channel where the command was executed
      let channel = message.mentions.channels.first() || message.channel;
  
      // Check if the role already lacks the "SEND_MESSAGES" permission in the channel
      if (!channel.permissionsFor(roleMention).has("SendMessages")) {
        return message.channel.send(`${channel} is already locked for ${roleMention}.`);
      }
  
      // Update the channel's permission overwrites for the role
      await channel.permissionOverwrites.create(roleMention, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: true,
      }).then(() => {
        message.channel.send(`${channel} is now locked for ${roleMention}.`);
      }).catch(error => {
        console.error(error);
        message.channel.send("An error occurred while trying to lock the channel.");
      });
    },
  };
  