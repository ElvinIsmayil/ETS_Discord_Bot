module.exports = {
    name: "vlockr",
    aliases: [],
    permissions: [],
    requiredRoles: [],
    cooldown: 0,
    devOnly: false,
    ownerOnly: false,
    hidden: false,
    description: "Locks a voice channel for a role",
  
    async execute(client, message, args) {
      const role = message.guild.roles.cache.find((r)=> r.name === args[0])
      let channel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[1]);
      if (!channel) channel = message.channel;
  
      if (channel.permissionsFor(role).has("Connect") === false) {
        return message.channel.send(`${channel} is already locked`);
      }
  
      await channel.permissionOverwrites.create(role, {
        Connect: false,
        ViewChannel: true,
      });
  
      message.channel.send(`${channel} is now locked`)
    },
  };