module.exports = {
    name: "nuke",
    aliases: ["nk"],
    permissions: ["Administrator"],
    requiredRoles: [],
    cooldown: 0,
    hidden: false,
    devOnly: false,
    description: "Nukes the current channel and creates a clone",
    async execute(client, message, args) {
      // Confirmation message to ensure the command was not called by accident
      const confirmationMessage = await message.channel.send(
        "⚠️ Are you sure you want to nuke this channel? This cannot be undone. Reply with `confirm` to proceed."
      );
  
      // Await confirmation
      const filter = (response) => {
        return (
          response.content.toLowerCase() === "confirm" &&
          response.author.id === message.author.id
        );
      };
  
      try {
        await message.channel.awaitMessages({
          filter,
          max: 1,
          time: 15000,
          errors: ["time"],
        });
  
        // Clone the current channel
        const clonedChannel = await message.channel.clone();
        // Try to set the cloned channel's position to match the original
        clonedChannel.setPosition(message.channel.position).catch(console.error);
        // Send a message in the cloned channel to indicate success
        clonedChannel.send("💥 Channel nuked.");
  
        // Delete the original channel
        await message.channel.delete("Nuke command used");
      } catch (error) {
        // If there was an error or no confirmation, inform the user
        console.error(error);
        confirmationMessage.edit(
          "Nuke command cancelled or timed out. No confirmation received."
        );
      }
    },
  };
  