require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const { handler } = require('./comandos/handler');
const config = require("./config.json");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions]
});

client.once("ready", () => {
    console.log("¡Bot Ranked encendido!");
    setInterval(() => {
        const ESTADOS = [
            "Duck Game - Ranked",
            "Utiliza r/comandos en #comandos.",
            "Recuerda leer las reglas."
        ];
        let status = ESTADOS[Math.floor(Math.random() * ESTADOS.length)];
        client.user.setPresence({
            activities: [{ name: status, type: 3 }],
            status: "online"
        });
    }, 5000);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.member || message.channel.type === ChannelType.DM) return;
    handler(message, client);
});

client.login(process.env.TOKEN);