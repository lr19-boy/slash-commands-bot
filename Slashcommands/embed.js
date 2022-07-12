const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('embeds a message provided by you')
	.addStringOption(option =>
		option.setName('message')
			.setDescription('the message is needed')
			.setRequired(true)),
	async execute(interaction) {
  const say = interaction.options.getString('message')

    const embed = new MessageEmbed()
      .setAuthor(interaction.user.tag, interaction.user.avatarURL())
      .setDescription(`${say}`)
      .setColor("BLUE")
      .setFooter(`Embeded by ${interaction.user.username}`)
      .setTimestamp()
		await interaction.followUp({ embeds: [embed] });
	},
};


