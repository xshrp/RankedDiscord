const { crearEmbed } = require("../utiles/embeds");
const { usuarioYaRegistrado, crearUsuario } = require("../utiles/funciones");
const config = require("../config.json");

const rIdRanked = config.roles.ranked;
const rIdPirata = config.roles.pirata;

function ejecutarUnirse(message) {
    if (message.member.roles.cache.has(rIdPirata)) {
        message.channel.send({ embeds: [crearEmbed("Error", "No puedes registrarte a la temporada siendo pirata.", "#ff0000")] });
        return;
    }

    if (message.member.roles.cache.has(rIdRanked)) {
        message.channel.send({ embeds: [crearEmbed("Error", "Ya estás registrado en la temporada actual.", "#ff0000")] });
        return;
    }

    if (!usuarioYaRegistrado(message.author.id)) {
        crearUsuario(message.author);
    }

    message.member.roles.add(rIdRanked);
    message.channel.send({ embeds: [crearEmbed("Duck Game - Ranked", "¡Te acabas de unir a la temporada de ranked!", "#ffdf00")] });
}

module.exports = { ejecutarUnirse };