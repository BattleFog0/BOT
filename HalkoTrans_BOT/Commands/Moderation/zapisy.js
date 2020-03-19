const { RichEmbed } = require("discord.js");

module.exports = {
    name: "zapisy",
    aliases: ["zapisy"],
    category: "Moderation",
    description: "Komenda dodaje pole do zapisywania się na konwoje",
    usage: "<input>",
    run: async(client, message, args) => {

        message.delete();


        const embed_zapis = new RichEmbed({

                color: 0x36393F, 
                title: 'Czy będziesz na konwóju ?', 
                fields:[
                    {
                        name: 'Osoby zapisane: ',
                        value: '✅'
                    }
                ],
                timestamp: new Date(),
                footer:(client.user.username, client.user.displayAvatarURL)
        });

            
        message.channel.send(embed_zapis)
        .then(msg => msg.react('✅'))
        .then(reactions => reactions.message.react("❔"))
        .then(reactions => reactions.message.react("❌"))
        .then(reactions => {
            
            

            const filter = (reaction, user) => {
                return reaction.emoji.name === '✅' && user.id === reaction.message.users;
            };

            const collector = reactions.message.createReactionCollector(filter, {
                time: 15000
            });

            collector.on('collect', r => {
                let embedLikeField = Object.assign({}, embed_zapis.fields[0]);
                let user = reactions.message.user;
                
                embedLikeField.value = `✅ ${user}`;

                const newEmbed = new RichEmbed({
                    color: 0x36393F, 
                    title: 'Czy będziesz na konwóju ?', 
                    fields: [embedLikeField],
                    timestamp: new Date(),
                    footer:(client.user.username, client.user.displayAvatarURL)
                });

                r.message.edit(newEmbed)
                .then(newMSG => console.log(`${user} zapisał się na konwój !`))
                .catch(console.log);
            });
                collector.on('end', collected => console.log(`Collected ${collected.size} reactions`));
        });
        
    }
}