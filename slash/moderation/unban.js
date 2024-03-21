const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a user from the server.')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('The ID of the user to unban')
                .setRequired(true)),
    async execute(interaction) {
        // Ensure interaction.guild is defined
        if (!interaction.guild) {
            return interaction.reply({ content: 'This command can only be used within a server.', ephemeral: true });
        }

        const userId = interaction.options.getString('userid');

        try {
            const bans = await interaction.guild.bans.fetch();
            
            if (!bans.size) {
                return interaction.reply({
                    embeds: [new EmbedBuilder().setColor('#FFFF00').setTitle('Unban Warning').setDescription('There are no banned users.')],
                    ephemeral: true
                });
            }

            const bUser = bans.find(b => b.user.id === userId);
            if (!bUser) {
                return interaction.reply({
                    embeds: [new EmbedBuilder().setColor('#FFA500').setTitle('Unban Notice').setDescription('The user ID is not banned.')],
                    ephemeral: true
                });
            }

            await interaction.guild.members.unban(bUser.user.id);
            return interaction.reply({
                embeds: [new EmbedBuilder().setColor('#00FF00').setTitle('Unban Success').setDescription(`Successfully unbanned ${bUser.user.tag}.`)],
                ephemeral: false
            });
        } catch (error) {
            console.error(error);
            return interaction.reply({
                embeds: [new EmbedBuilder().setColor('#FF0000').setTitle('Unban Error').setDescription('There was a problem processing your unban request.')],
                ephemeral: true
            });
        }
    }
};
