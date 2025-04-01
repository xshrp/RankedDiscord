const { crearEmbed } = require("../utiles/embeds");
const DATOS = require("../datos.json");

function ejecutarTop(message) {
    let ranking = [];
    for (let id in DATOS) {
        let usuario = DATOS[id];
        ranking.push(usuario);
    }
    ranking.sort((a, b) => b.puntos - a.puntos);

    if (ranking.length == 0) {
        message.channel.send({ embeds: [crearEmbed("Error", "No hay usuarios registrados.", "#ff0000")] })
        return;
    }

    let puestos = "", nombres = "", puntos = "";
    let maximo = Math.min(10, ranking.length);

    for (let i = 0; i < maximo; i++) {
        let usuario = ranking[i];

        puestos += `\`${i + 1}\`\n`;
        nombres += `\`${usuario.nick}\`\n`;
        puntos += `\`${usuario.puntos}\`\n`
    }

    let embed = crearEmbed("**Top**", null, "ffdf00");
    embed.addFields({ name: "Puesto", value: puestos, inline: true });
    embed.addFields({ name: "Nombre", value: nombres, inline: true });
    embed.addFields({ name: "Elo", value: puntos, inline: true });
    message.channel.send({ embeds: [embed] });
}

module.exports = { ejecutarTop };