module.exports = {
  name: "purge",
  description: "purges a specified amount of messages in a channel",
  options: [
    {
      type: 4,
      name: "amount",
      description: "amount of messages you wish to delete",
      required: true,
    },
  ],
  permissions: {
    bot: ["EMBED_LINKS", "MANAGE_MESSAGES"],
    user: ["MANAGE_MESSAGES"],
  },
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    if (amount < 0 || amount > 100) {
      return interaction.reply({
        content: `Amount of messages to clear must be higher than 0 and less than 100.`,
        ephemeral: true,
      });
    } else {
      await interaction.channel.bulkDelete(amount, true);
      interaction.reply({
        content: `Successfully cleared **${amount}** messages.`,
      });
    }
  },
};
