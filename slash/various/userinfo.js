const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    cooldown: 1,
    permissions: ['KickMembers'],
    requiredRoles: [],
    devOnly: false,
    hidden: false,
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays information about a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to get information about')
                .setRequired(false)), // Making it optional to get info on the command executor if no user is provided
    async execute(client, interaction) {
        let user = interaction.options.getUser('user');
        if (!user) user = interaction.user; // If no user is provided, use the command executor
        const member = await interaction.guild.members.fetch(user.id);

        const embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle(`User Information: ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'User Tag', value: user.tag, inline: true },
                { name: 'User ID', value: user.id, inline: true },
                { name: 'Is Bot', value: user.bot ? 'Yes' : 'No', inline: true },
                { name: 'Account Creation Date', value: user.createdAt.toDateString(), inline: true },
                { name: 'Guild Join Date', value: member.joinedAt.toDateString(), inline: true },
                // More fields can be added as needed
            )
            .setTimestamp()
            .setFooter({ text: `Information requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed] });
    },
};
