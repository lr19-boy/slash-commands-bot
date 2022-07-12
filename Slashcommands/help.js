const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('shows all the commands of the bot!'),
	async execute(interaction) {
        const helpEmbed = new MessageEmbed()
    .setTitle("Slash Command Bot Help")
    .setDescription("Here are the commands for the bot")
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
        
        let helpMenu = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId("help_menu")
      .setPlaceholder('Help Menu')
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions([
        {
          label: "Help",
          description: "Bot commands",
          value: "help",
          emoji: "🛒"
        }
      ])
    )
    
    interaction.followUp({ embeds: [helpEmbed], components: [helpMenu]})
	},
};