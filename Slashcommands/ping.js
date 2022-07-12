const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('ping pong pong ping'),
	async execute(interaction) {
		const ping = new MessageEmbed()
		.setColor('BLUE')
		.setTimestamp()
		.setTitle('🏓╎ Pong!')
		.setDescription(`🏠╎ Websocket Latency: ${interaction.client.ws.ping}ms`)
        
		interaction.followUp({ embeds: [ping] });
	},
};


