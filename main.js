

require("dotenv").config();
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  Options,
} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  sweepers: Options.DefaultSweeperSettings,
});
process.on("unhandledRejection", async (reason, promise) => {
  console.log(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});
process.on("uncaughtException", async (err) => {
  console.log(`Uncaught Exception: ${err}`);
});
process.on("uncaughtExceptionMonitor", async (err, origin) => {
  console.log(`Uncaught Exception: ${err}, origin: ${origin}`);
});
client.commands = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.slashCooldown = new Collection();
["command_handler", "event_handler", "slash_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
client.login(process.env.DISCORD_TOKEN);

