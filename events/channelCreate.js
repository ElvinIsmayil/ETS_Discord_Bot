const { Events } = require("discord.js");

module.exports = {
  name: Events.ChannelCreate,
  once:false,
  async execute(channel) {
    if (channel.type === 0 && channel.parentId === '1173215123788267556') {
        await channel.send('Welcome to the new channel everyone!');
    }
  },
};
