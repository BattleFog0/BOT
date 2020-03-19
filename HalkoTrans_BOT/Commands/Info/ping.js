module.exports = {
    name: "ping",
    category: "info", 
    description: "Zwraca opóźnienie i PING", 
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Pinguje ... 🏓`);

        msg.edit(`🏓 Pong !\nCzas potrzebny na połączenie to: ${Math.floor(msg.createdAt - message.createdAt)} ms\nLokalny Ping: ${Math.round(client.ping)}ms`);
    }
}