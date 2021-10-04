const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "support",
  description: "Sends The Invite Link To Our Support Server & Website!",
  async execute(interaction) {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Support Server")
        .setStyle("LINK")
        .setEmoji("<:Support:885431531550695445> ")
        .setURL("https://discord.gg/d5crGqkZsn"),

      new MessageButton()
        .setLabel("Website")
        .setStyle("LINK")
        .setEmoji("<:logo:882494086936940584>  ")
        .setURL("https://www.bunkdev.xyz/#home")
    );

    const embed = new MessageEmbed()
      .setColor("#A1EEEC")
      .setTitle("Bot Support Info")
      .setURL("https://www.bunkdev.xyz/")
      .setDescription(
        "**__Click the buttons below To Go To The Donker Support Server Or Website!!__**"
      );

    await interaction.reply({
      ephemeral: false,
      embeds: [embed],
      components: [row],
    });
  },
};
