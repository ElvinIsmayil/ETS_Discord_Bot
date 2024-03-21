module.exports = {
  name: "vlockm",
  aliases: [],
  permissions: [],
  requiredRoles: [],
  cooldown: 0,
  devOnly: false,
  ownerOnly: false,
  hidden: false,
  description: "Locks a voice channel for a member",

  async execute(client, message, args) {
    const targetMemberId = args.shift().replace(/[<@!&>]/g, "");
    const targerMember = await message.guild.members.fetch(targetMemberId);
    let channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    if (!channel) channel = message.channel;

    if (channel.permissionsFor(targetMember).has("Connect") === false) {
      return message.channel.send(`${channel} is already locked`);
    }

    await channel.permissionOverwrites.create(targerMember, {
      Connect: false,
      ViewChannel: true,
    });

    message.channel.send(`${channel} is now locked`)
  },
};
