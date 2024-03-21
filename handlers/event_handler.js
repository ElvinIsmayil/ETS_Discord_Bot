const fs = require("fs");
const path = require("node:path");
module.exports = (client) => {
  const parentFoldersPath = path.join(__dirname, "..");
  const eventsPath = path.join(parentFoldersPath, "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));
  try {
    console.log(`2. Loading event files...`);
    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      const fileStats = fs.statSync(filePath);
      const toKb = (fileStats.size / 1024).toFixed(2);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
      console.log(`${file} ${toKb} file loaded successfully`);
    }
    console.log(`All event files are loaded successfully \n`);
  } catch (error) {
    console.error('There was an error loading event files:',error);
  }
};

