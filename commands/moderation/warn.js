const fs = require("fs");
const path = require("path");

module.exports = {
  name: "warn",
  description: "Warns a user",
  permissions: ["Administrator"],
  requiredRoles: [],
  cooldown: 0,
  hidden: false,
  devOnly: false,
  execute(client, message) {
    const member = message.mentions.members.first(); // Ensure this is a GuildMember, not a User
    if (!member) {
      return message.channel.send("Please mention a valid member of this server.");
    }

    const filePath = "C:\\Users\\Elvin\\Desktop\\Discord_Bot\\warning.json";

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error("Error reading the JSON file", err);
        return message.channel.send("An error occurred");
      }

      let users = JSON.parse(data.toString());
      let userIndex = users.findIndex((user) => user.id === member.id);

      if (userIndex !== -1) {
        users[userIndex].warnCount += 1;
      } else {
        users.push({ id: member.id, username: member.user.tag, warnCount: 1 });
      }

      if (users[userIndex] && users[userIndex].warnCount >= 5) {
        // Remove all roles
        member.roles.remove(member.roles.cache)
          .then(() => {
            // Assign the specific role
            const SPECIFIC_ROLE_ID = 'your-specific-role-id-here';
            member.roles.add(SPECIFIC_ROLE_ID)
              .then(() => message.channel.send(`${member.user.tag} has been assigned a specific role for reaching 5 warnings.`))
              .catch(err => {
                console.error("Failed to assign the specific role", err);
                message.channel.send("Failed to assign the specific role.");
              });
          })
          .catch(err => {
            console.error("Failed to remove roles", err);
            message.channel.send("Failed to remove existing roles.");
          });
      } else {
        fs.writeFile(filePath, JSON.stringify(users, null, 4), (err) => {
          if (err) {
            console.error("Error writing to the JSON file", err);
            return message.channel.send("An error occurred");
          }
  
          message.channel.send(`Warned ${member.user.tag}. They now have ${users[userIndex].warnCount} warnings.`);
        });
      }
    });
  },
};
