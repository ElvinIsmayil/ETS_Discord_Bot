const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    cooldown: 1,
    permissions: ['KickMembers'],
    requiredRoles: [],
    devOnly: false,
    hidden: false,
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a member from the server.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The member to kick')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('The reason for kicking the member')
                .setRequired(false)),
    async execute(client, interaction) {
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!member) {
            const errorEmbed = new EmbedBuilder()
                .setColor("#FF0000") // Red color for error
                .setTitle("❌ Kick Failed")
                .setDescription("Could not find the user.")
                .setThumbnail("https://i.imgur.com/5TdJmUw.png") // Example X mark image
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        if (!member.kickable) {
            const errorEmbed = new EmbedBuilder()
                .setColor("#FF0000")
                .setTitle("❌ Kick Failed")
                .setDescription("I cannot kick this user. Do I have the right permissions?")
                .setThumbnail("https://i.imgur.com/5TdJmUw.png") // Example X mark image
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        try {
            await member.kick(reason);
            const successEmbed = new EmbedBuilder()
                .setColor("#00FF00") // Green color for success
                .setTitle("✅ Member Kicked")
                .setDescription(`# Successfully kicked **${member.user.tag}** for reason: ${reason}`)
                .setThumbnail(member.user.displayAvatarURL()) // User's profile picture
                .setTimestamp();
            await interaction.reply({ embeds: [successEmbed] });
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setColor("#FF0000")
                .setTitle("❌ Kick Failed")
                .setDescription("There was an error trying to kick this member!")
                .setThumbnail("https://i.imgur.com/5TdJmUw.png") // Example X mark image
                .setTimestamp();
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};
