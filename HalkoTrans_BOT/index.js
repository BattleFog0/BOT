const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const token = process.env.token;

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();


["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const activities_list = [
    "Halko Trans Logistics",
    "Najbliższy Konwój: ", 
    "18/01/2020"
    ];

client.on("ready", () => {
    console.log('Halko Trans Logistics'); 
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 3000);
});


client.on("message", async message => {
    const prefix = "!";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.lenght === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);
});

client.login(token);