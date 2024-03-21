const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'guildMemberAdd',
  once: false,
  async execute(client, member) {
    const VERIFIED_ROLE_ID = '1219031364070805644'; // Replace with your actual verified role ID
    if (!member || !member.id) return; // Guard clause if member is undefined

    // Generate a simple 5-digit CAPTCHA code
    const captcha = Math.random().toString(36).substring(2, 7);
    // Assuming CAPTCHA_CODES is declared at a higher scope or persisted elsewhere
    const CAPTCHA_CODES = new Map();
    CAPTCHA_CODES.set(member.id, captcha);

    const verificationEmbed = new EmbedBuilder()
      .setTitle('Verification Required')
      .setDescription(`Welcome to the server! Please complete this verification step by replying with the following code: **${captcha}**`)
      .setColor(0x0099ff);

    try {
      const dmChannel = await member.createDM();
      await dmChannel.send({ embeds: [verificationEmbed] });

      const filter = m => m.author.id === member.id;
      const collector = dmChannel.createMessageCollector({ filter, time: 300000 }); // 5 minutes

      collector.on('collect', async m => {
        if (m.content === captcha) {
          const guild = member.guild;
          if (!guild) return; // Check if guild is undefined
          const role = guild.roles.cache.get(VERIFIED_ROLE_ID);
          if (!role) {
            console.log("Role not found in the guild.");
            return;
          }

          try {
            await member.roles.add(role);
            await m.reply('You have been verified and given access to the server. Welcome!');
            CAPTCHA_CODES.delete(member.id); // Clean up after verification
            collector.stop(); // Stop collecting after successful verification
          } catch (err) {
            console.error('Failed to add the role:', err);
            await m.reply('Failed to verify you due to an internal error. Please contact the server administrators.');
          }
        } else {
          await m.reply('Incorrect code, please try again.');
        }
      });

      collector.on('end', async (_, reason) => {
        if (reason === 'time') {
          await dmChannel.send('Verification time expired. Please try to join the server again or contact an administrator.');
          CAPTCHA_CODES.delete(member.id); // Clean up
        }
      });
    } catch (err) {
      console.error('Failed to send verification DM:', err);
    }
  }
};
