# 📚 ETS Discord Bot

## 📋 Overview
The **ETS Discord Bot** is a feature-rich bot designed to enhance your Discord server experience. Built using Node.js, this bot integrates with various APIs to provide real-time functionalities, such as managing server activities, responding to user commands, and delivering notifications. Whether you're a server admin looking to streamline operations or a community member seeking interactive features, this bot has something for everyone!

## ✨ Features
- 🎤 **Voice Channel Management**: Automatically manage voice channels based on user activity.
- 📅 **Event Scheduling**: Schedule events and send reminders to server members.
- 🔔 **Notification System**: Receive notifications about server updates and activities.
- 🎮 **Game Integration**: Play and manage games directly within Discord.
- 🛠️ **Custom Commands**: Create and customize commands to suit your server's needs.

## 🚀 Installation
To install the ETS Discord Bot, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ElvinIsmayil/ETS_Discord_Bot.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd ETS_Discord_Bot
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Create a `.env` file** to store your Discord bot token and other sensitive information:
   ```bash
   touch .env
   ```

5. **Add your bot token** to the `.env` file:
   ```
   DISCORD_TOKEN=your_bot_token_here
   ```

6. **Run the bot**:
   ```bash
   node main.js
   ```

## 🔧 Configuration
The ETS Discord Bot can be configured via the `.env` file. Here are the main configuration options:

| Option          | Description                             | Example                        |
|-----------------|-----------------------------------------|--------------------------------|
| `DISCORD_TOKEN` | Your Discord bot token                  | `DISCORD_TOKEN=abc123xyz456`  |
| `PREFIX`        | Command prefix for bot commands         | `PREFIX=!`                     |
| `GUILD_ID`      | The ID of the Discord server (guild)   | `GUILD_ID=123456789012345678` |

## 📊 Usage Examples
Once the bot is running, you can interact with it using commands. Here are a few examples:

- **Create an event**:
   ```plaintext
   !createEvent "Game Night" "2023-10-30T20:00:00Z"
   ```
   This command will schedule a game night event on the specified date and time.

- **List all events**:
   ```plaintext
   !listEvents
   ```
   Use this command to see all scheduled events in the server.

- **Join a voice channel**:
   ```plaintext
   !join
   ```
   This command allows the bot to join your current voice channel.

## 📘 API Reference
### `createEvent(eventName, eventDate)`
- **Parameters**:
  - `eventName` (String): The name of the event.
  - `eventDate` (String): The ISO 8601 formatted date and time of the event.
- **Returns**: A confirmation message about the scheduled event.
- **Example**:
   ```javascript
   const response = createEvent("Game Night", "2023-10-30T20:00:00Z");
   console.log(response); // "Event 'Game Night' scheduled for 2023-10-30T20:00:00Z"
   ```

### `listEvents()`
- **Returns**: An array of scheduled events.
- **Example**:
   ```javascript
   const events = listEvents();
   console.log(events); // ["Game Night on 2023-10-30T20:00:00Z"]
   ```

## 🧩 Architecture
The architecture of the ETS Discord Bot is designed to be modular and maintainable. Below is a simple text-based diagram representing the core components:

```
+-------------------+
|   Discord API     |
+---------+---------+
          |
          |
+---------v---------+
|   ETS Discord Bot |
|   (main.js)      |
+---------+---------+
          |
          |
+---------v---------+
|   Commands Module  |
+-------------------+
```

## 🔒 Security Considerations
- Always keep your bot token secure and never expose it in public repositories.
- Use environment variables to store sensitive information.
- Regularly update dependencies to mitigate vulnerabilities.

## 🧪 Testing
To run tests for the ETS Discord Bot, execute the following command:

```bash
npm test
```

Make sure you have set up your testing environment properly by following the instructions in the `test` folder.

## 🤝 Contributing
Contributions are welcome! Please follow these guidelines:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them with descriptive messages.
- Open a pull request detailing your changes.

## 📝 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for checking out the ETS Discord Bot! If you have any questions or feedback, feel free to open an issue on GitHub. Happy coding! 🎉
