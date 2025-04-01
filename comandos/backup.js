const { AttachmentBuilder } = require('discord.js');
const path = require("path");
const { crearEmbed } = require("../utiles/embeds");
const CONFIG = require("../config.json");

function ejecutarBackupManual(message) {
    if(message.author.id == CONFIG.sharp)
    {
        let bkup = new AttachmentBuilder(path.join(__dirname, "../datos.json"));
        let embed = crearEmbed("**Back-Up**", "Se ha guardado un back-up (Revisa tu MD).", "ffdf00");
        message.channel.send({ embeds: [embed] });
        message.author.send({
            text: `**Back-Up** \nFecha: ${message.createdAt}`,
            files: [bkup],
        });
    }
}

module.exports = { ejecutarBackupManual };