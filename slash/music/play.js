const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');

module.exports = {
    cooldown: 0,
    permissions: ['KickMembers'],
    requiredRoles: [],
    devOnly: false,
    hidden: false,
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song from YouTube.')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('The name of the song to play')
                .setRequired(true)),
    async execute(client, interaction) {
        const song = interaction.options.getString('song');

        // User must be in a voice channel
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to play music!');
        }

        // Search for the song on YouTube
        const searchResults = await ytsr(song, { limit: 1 });
        if (!searchResults.items.length) {
            return interaction.reply('No results found for your query.');
        }
        const songInfo = searchResults.items[0];
        
        // Join the voice channel
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        // Create a stream from YouTube and play it
        const stream = ytdl(songInfo.url, { filter: 'audioonly' });
        const resource = createAudioResource(stream);
        const player = createAudioPlayer();
        player.play(resource);
        connection.subscribe(player);

        await interaction.reply(`Now playing: **${songInfo.title}**`);
    },
};
