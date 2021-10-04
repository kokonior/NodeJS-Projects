const { Client, Collection, Intents } = require("discord.js");
const { clientId, guildId } = require("../config.json");
const { walkdir } = require("./utils/index2");
const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");
const { resolve } = require("path");

const mongoose = require("./database/mongoose.js");
const {permissions: unban} = require("./commands/moderation/ban");
mongoose.init();

require("dotenv").config();
const { DISCORD_TOKEN } = process.env;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
  ],
});

module.exports = {
  client
}

client.commands = new Collection();

const rest = new REST({ version: "9" }).setToken(DISCORD_TOKEN);

client.on("guildBanAdd", async (ban) => {
  const fetchedLogs = await ban.guild.fetchAuditLogs({
    limit: 1,
    type: "MEMBER_BAN_ADD",
  });

  const banLog = fetchedLogs.entries.first();

  const { target } = banLog;

  if (target.id === ban.user.id) {
    console.log(
      `${ban.user.tag} Got Banned In  ${ban.guild.name} Server.`
    );
  }
});


client.on("guildBanRemove", async (ban) => {
  const fetchedLogs = await ban.guild.fetchAuditLogs({
    limit: 1,
    type: "MEMBER_BAN_REMOVE",
  });

  const channel = client.channels.cache.get("882412740818386964");

  const banLog = fetchedLogs.entries.first();

  const { target } = banLog;

  if (target.id === unban.user.id) {
    console.log(
        `${unban.user.tag} Got unbanned In  ${unban.guild.name} Server.`
    );

   await channel.send(
        `\`\`\` ${unban.user.tag} Got unbanned in ${unban.guild.name} Server.\`\`\``
    );
  }
});


(async () => {
  try {
    for await (const path of walkdir("src/commands")) {
      const command = require(resolve(path));
      client.commands.set(command.name, command);
      console.log(`Loaded "${command.name}" command`);
    }

    for await (const path of walkdir("src/events")) {
      const event = require(resolve(path));
      client[!event.once ? "on" : "once"](event.name, event.listener);
      console.log(`Loaded "${event.name}" event`);
    }

    console.log("Started refreshing application slash commands");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: [...client.commands.values()],
    });

    console.log("Successfully reloaded application slash commands");
  } catch (error) {
    console.error(error);
  }
})();

client.login(DISCORD_TOKEN);
