module.exports = {
    name: "clear",
    aliases: ["clear"],
    category: "Moderation",
    description: "Komenda czyści (usuwa) wybraną ilość wierszy",
    usage: "<input>",
    run: async(client, message, args) => {

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nie masz uprawnień !");
        if(!args[0]) return message.channel.send("Musisz określić ilość wierszy do usunięcia !");

        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`Usunięto ${args[0]} wiadomości !`).then (msg => msg.delete(2000));
        });
    }
}