const { EmbedBuilder } = require("discord.js");

function crearEmbed(titulo, descripcion, colorHexa, miniatura = null) {
    let embed = new EmbedBuilder()
        .setTitle(titulo)
        .setDescription(descripcion)
        .setColor(colorHexa)
        .setFooter({ text: "Duck Game - Ranked" })
    if (miniatura) embed.setThumbnail(miniatura);
    return embed;
}

module.exports = { crearEmbed };