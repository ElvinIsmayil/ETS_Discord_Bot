const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    cooldown: 1,
    permissions: ['ModerateMembers'], // Ensure only users with permission can use this command
    requiredRoles: [],
    devOnly: false,
    hidden: false,
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Puts a member in timeout for a specified duration.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The member to timeout')
                .setRequired(true))
        .addIntegerOption(option => 
            option.setName('duration')
                .setDescription('The duration of the timeout in minutes')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('The reason for putting the member in timeout')
                .setRequired(false)),
    async execute(client, interaction) {
        const member = interaction.options.getMember('user');
        const duration = interaction.options.getInteger('duration');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!member) {
            const errorEmbed = new EmbedBuilder()
                .setColor("#FF0000")
                .setTitle("❌ Timeout Failed")
                .setDescription("Could not find the user.")
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        if (!member.moderatable) {
            const errorEmbed = new EmbedBuilder()
                .setColor("#FF0000")
                .setTitle("❌ Timeout Failed")
                .setDescription("I cannot timeout this user. Do I have the right permissions?")
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        try {
            await member.timeout(duration * 60 * 1000, reason); // Duration must be in milliseconds
            const successEmbed = new EmbedBuilder()
                .setColor("#00FF00")
                .setTitle("✅ Member Timed Out")
                .setDescription(`Successfully put **${member.user.tag}** in timeout for ${duration} minute(s) for reason: ${reason}`)
                .setThumbnail(member.user.displayAvatarURL())
                .setTimestamp();
            await interaction.reply({ embeds: [successEmbed] });
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setColor("#FF0000")
                .setTitle("❌ Timeout Failed")
                .setDescription("There was an error trying to timeout this member!")
                .setTimestamp();
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};
