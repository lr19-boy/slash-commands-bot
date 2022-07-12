const { Intents, Collection, Client, MessageEmbed, MessageAttachment, MessageButton, MessageActionRow } = require('discord.js')
const fs = require('fs');
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9');
const clientId = "yourbotid";
const guildId = "yourserverid";
const db = require('quick.db');

const client = new Client({
  intents: 513,
})

let dbs = JSON.parse(fs.readFileSync("./database.json", "utf8"));
let cooldown = new Set();
let cdseconds = 5;


const token = process.env.token;

client.Slashcommands = new Collection();

client.on('ready', (client) => {
        console.log(client.guilds.cache.size, "in servers");
        console.log(`${client.user.username} is now active`);
        const activities_list = [
            { type: 'WATCHING', message: 'Updating the project' },
            { type: 'PLAYING', message: 'Working on slash command' },
            { type: 'LISTENING', message: 'New version discord.js v13.8.1' },
        ];

        client.user.setStatus("online");

        setInterval(() => {
            const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);

            client.user.setActivity(activities_list[index].message, { type: activities_list[index].type });
        }, 10000);
});

//Slash commands
const commandFiles = fs.readdirSync('./Slashcommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./Slashcommands/${file}`);

  client.Slashcommands.set(command.data.name, command)
}

const commands = [];

for (const file of commandFiles) {
  const command = require(`./Slashcommands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

        fs.readdir('./Slashcommands/', async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    let props = require(`./Slashcommands/${file}`);
    let cmdName = file.split('.')[0];
    console.log(`Running: '${cmdName}'`);
    client.Slashcommands.set(cmdName, props);
  });
});
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async interaction => {
      if (!interaction.isSelectMenu()) return;

    if (interaction.customId === "help_menu") {

        let msg = await interaction.channel.messages.fetch(interaction.message.id)

        if (interaction.values[0] === "help") {
            await interaction.deferUpdate()

            const helpEmbed = new MessageEmbed()
        .setTitle("🛒 Help Commands 🛒")
        .addFields(
            { name: "/help", value: "View all the commands of the bot", inline: true},
            {name: "/avatar", value: "When u type this command the bot will send ur profile pic",inline:true},
            {name: "/calculate", value: "e!calculate 2+2 (if you don't know maths use this LOL😆)",inline:true},
          { name: "/embed", value: "Make an embedded announcement!", inline: true},
            { name: "/meme", value: "Makes you laugh!", inline: true},
            { name: "/ping", value: "Pong! Get the bot's websocket ping!", inline: true},
        )
        .setColor("BLUE")
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL());
const mySecret = process.env['token']

      await msg.edit({ embeds: [helpEmbed] });

        }
    }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName: command } = interaction;

  if (!client.Slashcommands.has(interaction.commandName)) return;

    await interaction.deferReply()
    await client.Slashcommands.get(interaction.commandName).execute(interaction);
});

require('./server')();
client.login(process.env.token);

