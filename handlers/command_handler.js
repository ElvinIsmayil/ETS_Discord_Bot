const fs = require("fs");
const path = require("node:path");
module.exports = (clients) => {
  const parentFoldersPath = path.join(__dirname, "..");
  const foldersPath = path.join(parentFoldersPath, "commands");
  const commandFolders = fs.readdirSync(foldersPath);
  try {
    console.log(`1. Loading command files...`);
    for (const folder of commandFolders) {
      console.log(`\nLoading command files for ${folder} folder`);
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        const fileStats = fs.statSync(filePath);
        const toKb = (fileStats.size / 1024).toFixed(2);
        if (command.name && command.hidden == false) {
          clients.commands.set(command.name, command);
        } else {
          continue;
        }
        console.log(`${file} ${toKb} loaded successfully`);
      }
    }
    console.log(`All command files loaded successfully \n`);
  } catch (error) {
    console.error('There was an error loading command file:',error);
  }
};

