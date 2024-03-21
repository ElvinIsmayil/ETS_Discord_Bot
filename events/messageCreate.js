const { Events, Collection, MessageFlags } = require("discord.js");
const client = require("../main.js");

module.exports = {
  name: Events.MessageCreate,
  once:false,
  async execute(message) {
    // ! Auto suggest
    if (message.channel.id === "1210870783493021696") {
      message.react("👍🏻");
      message.react("👎🏻");
    }

    // ! Anti-advertise
    const msg = "No advertising here!";
    if (!message.guild) return;

    function deleteMessage() {
      if (!message.author.bot) {
        message.author.send(msg);

        setTimeout(() => {
          message.delete();
        }, 3000);
      }
    }

    if (!message.member.roles.cache.has("1173215123196878965")) {
      const forbiddenLinks = ["discord.gg"];

      forbiddenLinks.forEach((link) => {
        if (message.content.includes(link)) return deleteMessage();
      });
    }

    // ! Command setup
    const prefix = "!";

    if (!message.content.startsWith(prefix)) {
      return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command =
      message.client.commands.get(cmd) ||
      message.client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

    if (!command) {
      message.author.send(`**${cmd}** command is not valid`);
      message.delete();
      return;
    }

    // ! Commands permissions
    const validPermissions = [
      "CreateInstantInvite",
      "KickMembers",
      "BanMembers",
      "Administrator",
      "ManageChannels",
      "ManageGuild",
      "AddReactions",
      "ViewAuditLog",
      "PrioritySpeaker",
      "Stream",
      "ViewChannel",
      "SendMessages",
      "SendTTSMessages",
      "ManageMessages",
      "EmbedLinks",
      "AttachFiles",
      "ReadMessageHistory",
      "MentionEveryone",
      "UseExternalEmojis",
      "ViewGuildInsights",
      "Connect",
      "Speak",
      "MuteMembers",
      "DeafenMembers",
      "MoveMembers",
      "UseVAD",
      "ChangeNickname",
      "ManageNicknames",
      "ManageRoles",
      "ManageWebhooks",
      "ManageGuildExpressions",
      "UseApplicationCommands",
      "RequestToSpeak",
      "ManageEvents",
      "ManageThreads",
      "CreatePublicThreads",
      "CreatePrivateThreads",
      "UseExternalStickers",
      "SendMessagesInThreads",
      "UseEmbeddedActivities",
      "ModerateMembers",
      "ViewCreatorMonetizationAnalytics",
      "UseSoundboard",
      "CreateGuildExpressions",
      "CreateEvents",
      "UseExternalSounds",
      "SendVoiceMessages",
    ];

    if (command.permissions && command.permissions.length) {
      let invalidPerms = [];
      for (const perm of command.permissions) {
        if (!validPermissions.includes(perm)) {
          console.log(`Invalid permissions ${perm}`);
          return; // Exit if there's an invalid permission
        }
        if (!message.member.permissions.has(perm)) {
          invalidPerms.push(perm);
        }
      }
      if (invalidPerms.length) {
        return message.channel.send(
          `Missing Permissions: \`${invalidPerms.join(", ")}\``
        ); // Show missing permissions
      }
    }
    // ! command roles
    const member = message.member;
    const requiredRoles = command.requiredRoles;

    if (requiredRoles && requiredRoles.length > 0) {
      const hasRequiredRole = member.roles.cache.some((role) =>
        requiredRoles.includes(role.name)
      );
      if (!hasRequiredRole) {
        return message.reply(
          "You do not have the required roles to use this command "
        );
      }

      // ! command cooldown
      if (!message.client.cooldowns.has(command.name)) {
        message.client.cooldowns.set(command.name, new Collection());
      }

      const current_time = Date.now();
      const time_stamps = message.client.cooldowns.get(command.name);
      const cooldown_amount = command.cooldown * 60000;

      if (time_stamps.has(message.author.id)) {
        const expiration_time =
          time_stamps.get(message.author.id) + cooldown_amount;
        if (current_time < expiration_time) {
          const time_left = (expiration_time - current_time) / 60000;

          return message.reply(
            `Please wait ${time_left.toFixed(1)} more minutes before using ${
              command.name
            }`
          );
        }
      }

      time_stamps.set(message.author.id, current_time);
      setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
    }
    // ! developer only
    if (command.devOnly) {
      const userId = message.author.id;
      const devId = "959547190404059236";

      if (userId !== devId) {
        if (!message.author.bot) {
          message.reply("Only the developer can use this command");
          return;
        }
      }
    }

    // ! owner only

    if (command.ownerOnly) {
      const userId = message.author.id;
      const ownerId = message.guild.ownerId;
      const devId = "959547190404059236";

      if (!userId !== ownerId) {
        if (!message.author.bot) {
          if (userId !== devId) {
            message.reply("Only server owner can use this command");
            return;
          }
        }
      }
    }

    // Execute command if all checks pass
    command.execute(client, message, args);
  },
};
