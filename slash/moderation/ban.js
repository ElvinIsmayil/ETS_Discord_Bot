const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    cooldown: 1,
    permissions: ['BanMembers'],
    requiredRoles: [],
    devOnly: false,
    hidden: false,
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a member from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The member to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for banning the member')
                .setRequired(false))
        .addNumberOption(option =>
            option.setName('days')
                .setDescription('Number of days of messages to delete, 0 to 7')
                .setRequired(false)),
    async execute(client, interaction) {
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const days = interaction.options.getNumber('days') || 0;

        if (!member) {
            const errorEmbed = new EmbedBuilder()
                .setColor("#FF0000")
                .setTitle("❌ Ban Failed")
                .setDescription("Could not find the user.")
                .setThumbnail("https://i.imgur.com/5TdJmUw.png")
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        if (!member.bannable) {
            const errorEmbed = new EmbedBuilder()
                .setColor("#FF0000")
                .setTitle("❌ Ban Failed")
                .setDescription("I cannot ban this user. Do I have the right permissions?")
                .setThumbnail("https://i.imgur.com/5TdJmUw.png")
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        try {
            await member.ban({ days: days, reason: reason });
            const successEmbed = new EmbedBuilder()
                .setColor("#00FF00")
                .setTitle("✅ Member Banned")
                .setDescription(`Successfully banned **${member.user.tag}** for reason: ${reason}`)
                .setThumbnail(member.user.displayAvatarURL())
                .setTimestamp();
            await interaction.reply({ embeds: [successEmbed] });
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setColor("#FF0000")
                .setTitle("❌ Ban Failed")
                .setDescription("There was an error trying to ban this member!")
                .setThumbnail("https://i.imgur.com/5TdJmUw.png")
                .setTimestamp();
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};
