const {
  Events,
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
  InteractionType,
  EmbedBuilder,
} = require("discord.js");

const client = require("../main");
const ms = require("ms");

module.exports = {
  name: Events.InteractionCreate,
  once:false,
  async execute(interaction) {
    // ! slashCommand handling
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.slashCommands.get(
        interaction.commandName
      );

      // ! cooldown handling
      const current_time = Date.now();
      const time_stamps = interaction.client.slashCooldown.get(
        `${interaction.user.id}_${command.data.name}`
      );

      if (time_stamps > current_time) {
        interaction.reply({
          content: `Please wait ${ms(time_stamps - current_time)} more to use ${
            command.data.name
          }`,
        });
      }

      interaction.client.slashCooldown.set(
        `${interaction.user.id}_${command.data.name}`,
        current_time + command.cooldown * 60000
      );

      //! permissions
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

      if (command.permissions.length) {
        const invalidPerms = [];
        const member = interaction.member;

        for (const perm of command.permissions) {
          if (!validPermissions.includes(perm)) {
            return console.log(`Invalid Permissions ${perm}`);
          }
          if (!member.permissions.has(perm)) {
            invalidPerms.push(perm);
          }
        }

        if (invalidPerms.length) {
          return interaction.reply({
            content: `Missing Permissions: \`${invalidPerms}\` `,
            ephemeral: true,
          });
        }
      }

      //! command roles
      const member = interaction.guild.members.cache.get(interaction.user.id);
      const requiredRoles = command.requiredRoles;

      if (requiredRoles && requiredRoles.length > 0) {
        const hasRequiredRole = member.roles.cache.some((role) =>
          requiredRoles.includes(role.name)
        );

        if (!hasRequiredRole) {
          return interaction.reply({
            content: "You do not have required roles to use this command",
            ephemeral: true,
          });
        }
      }

      //! developer only
      if (command.devOnly){
        const userId = interaction.user.id;
        const devId = "959547190404059236";

        if (userId !== devId) {
          interaction.reply({
            content: "This command is only for the developer",
            ephemeral: true,
          });
        }
      }

      //! owner only
      if (command.ownerOnly) {
        const userId = interaction.user.id;
        const ownerId = interaction.guild.ownerId;
        const devId = "959547190404059236";

        if (userId != ownerId) {
          if (userId != devId) {
            interaction.reply({
              content: "This command is server owner only",
              ephemeral: true,
            });
          }
        }
      }

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found`
        );
        return;
      }

      try {
        await command.execute(client, interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
      }
    } else if (interaction.isButton()) {
      // ! button handling
      switch (interaction.customId) {
        case "confirm":
          interaction.reply({ content: "Confirm button clicked" });
          break;
        case "deny":
          interaction.reply({ content: "Deny button clicked" });
          break;

        case "modal":
          const modal = new ModalBuilder()
            .setCustomId("test-modal")
            .setTitle("Modal title");

          const test1 = new TextInputBuilder()
            .setCustomId("modalInput1")
            .setLabel("Input test 1")
            .setStyle(TextInputStyle.Short);

          const test2 = new TextInputBuilder()
            .setCustomId("modalInput2")
            .setLabel("Input test 2")
            .setStyle(TextInputStyle.Paragraph);

          const text1ActionRow = new ActionRowBuilder().addComponents(test1);
          const text2ActionRow = new ActionRowBuilder().addComponents(test2);

          modal.addComponents(text1ActionRow, text2ActionRow);

          interaction.showModal(modal, {
            client: client,
            interaction: interaction,
          });
      }
    } else if (interaction.isStringSelectMenu) {
      // ! select menu handling
      switch (interaction.customId) {
        case "selectmenu":
          for (const selectedValue of interaction.values) {
            switch (selectedValue) {
              case "option1":
                interaction.reply({ content: "Option 1 selected" });
              case "option2":
                interaction.reply({ content: "Option 2 selected" });
                break;
            }
          }
          break;
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      // ! modal submition handling

      await interaction.reply({
        content: "Modal submitted",
        ephemeral: true,
      });

      const modalInput1Answer =
        interaction.fields.getTextInputValue("modalInput1");

      const modalInput2Answer =
        interaction.fields.getTextInputValue("modalInput2");

      const newEmbed2 = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("New embed from modal")
        .setDescription("This is a new embed with modal answers")
        .addFields(
          {
            name: "Modal input 1 answer",
            value: modalInput1Answer,
          },
          {
            name: "Modal input 2 answer",
            value: modalInput2Answer,
          }
        );
      interaction.channel.send({ embeds: [newEmbed2] });
    }
  },
};
