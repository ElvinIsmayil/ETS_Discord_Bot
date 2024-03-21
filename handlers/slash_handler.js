const fs = require("fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js");
const commands = [];
module.exports = (client) => {
  const parentFoldersPath = path.join(__dirname, "..");
  const foldersPath = path.join(parentFoldersPath, "slash");
  const commandsFolder = fs.readdirSync(foldersPath);
  try {
    console.log(`3. Loading slash command files...`);
    for (const folder of commandsFolder) {
      console.log(`\nLoading slash command files for ${folder} folder`);
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        const fileStats = fs.statSync(filePath);
        const toKb = (fileStats / 1024).toFixed(2);
        if ("data" in command && "execute" in command && !command.hidden) {
          client.slashCommands.set(command.data.name, command);
          commands.push(command.data.toJSON());
        } else {
          console.log(
            `[WARNING] the command at ${filePath} is missing required "data" or "execute" property or command is hidden`
          );
        }
        console.log(`File loaded successfully`);
      }
    }
  } catch (error) {
    console.log(`There was an error loading slash commands ${error}`);
  }
  const rest = new REST().setToken(
    "MTA2OTUzOTU1OTI3NDE5Mjk3Nw.GoQI-g.AJYnZoysxmCUd4AU0Hzhs-thiUamlMIupHBt-o"
  );
  (async () => {
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands`
      );
      const data = await rest.put(
        Routes.applicationGuildCommands(
            1069539559274192977,  // client id
            1173215123171704864  // guild id
        ),
        { body: commands }
      );
    } catch (error) {
      console.log(`${error}`);
    }
  })();
};