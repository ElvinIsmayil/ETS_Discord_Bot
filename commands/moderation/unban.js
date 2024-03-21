const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unbans a user',
    permissions: ['Administrator'],
    requiredRoles: [],
    cooldown: 0,
    hidden: false,
    devOnly: false,
    execute(client, message, args) {
        // Check if the user has provided an ID
        if (!args.length) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000') // Red color for error
                .setTitle('Unban Error')
                .setDescription('Please provide the ID of the user you want to unban.');
            return message.channel.send({ embeds: [embed] });
        }

        const userId = args[0]; // Assuming the ID is the first argument

        // Attempt to unban the user
        message.guild.bans.fetch().then(bans => {
            if (bans.size == 0) {
                const embed = new EmbedBuilder()
                    .setColor('#FFFF00') // Yellow color for warning
                    .setTitle('Unban Warning')
                    .setDescription('There are no banned users.');
                return message.channel.send({ embeds: [embed] });
            }

            let bUser = bans.find(b => b.user.id === userId);
            if (!bUser) {
                const embed = new EmbedBuilder()
                    .setColor('#FFA500') // Orange color for specific notice
                    .setTitle('Unban Notice')
                    .setDescription('The user ID is not banned.');
                return message.channel.send({ embeds: [embed] });
            }

            message.guild.members.unban(bUser.user.id).then(() => {
                const embed = new EmbedBuilder()
                    .setColor('#00FF00') // Green color for success
                    .setTitle('Unban Success')
                    .setDescription(`Successfully unbanned ${bUser.user.tag}.`);
                message.channel.send({ embeds: [embed] });
            }).catch(err => {
                console.error(err);
                const embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle('Unban Error')
                    .setDescription('Something went wrong trying to unban that user.');
                message.channel.send({ embeds: [embed] });
            });
        }).catch(err => {
            console.error(err);
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Unban Error')
                .setDescription('Something went wrong fetching the ban list.');
            message.channel.send({ embeds: [embed] });
        });
    }
};
