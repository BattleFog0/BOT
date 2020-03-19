const { RichEmbed } = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["bc", "broadcast"],
    category: "moderation",
    description: "Says your input via the bot",
    usage: "<input>",
    run: (client, message, args) => {
        message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(1000));

        if (args.length < 0)
            return message.reply("Nothing to say?").then(m => m.delete(1000));

        if (args[0].toLowerCase() === "embed") {
            const embed = new RichEmbed()
                .setColor('#36393F')
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL);

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}