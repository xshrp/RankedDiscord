const fs = require("fs");
const path = require("path");

const DATOS = require("../datos.json");
const CONFIG = require("../config.json");
const { crearEmbed } = require("../utiles/embeds");
const { calcularEloPartida } = require("../utiles/funciones");

function ejecutarWin(message, client) {
    const AUTOR = message.author;
    const MENCIONADO = message.mentions.users.first();

    let errorEmbed = crearEmbed("**Error**", null, "#ff0000");
    if (!message.member.roles.cache.has(CONFIG.roles.ranked)) {
        errorEmbed.setDescription("Debes formar parte de la temporada para usar este comando (utiliza \`r/unirse\`).");
        message.channel.send({ embeds: [errorEmbed] });
        return;
    }
    if (!MENCIONADO) {
        errorEmbed.setDescription("Debes mencionar a alguien para reportar una victoria.");
        message.channel.send({ embeds: [errorEmbed] });
        return;
    }
    if (AUTOR.id == MENCIONADO.id) {
        errorEmbed.setDescription("¿Estas intentando reportar una partida contigo mismo? :/");
        message.channel.send({ embeds: [errorEmbed] });
        return;
    }
    if (!DATOS[MENCIONADO.id]) {
        errorEmbed.setDescription(`${message.author} el usuario ${MENCIONADO} no esta participando en esta temporada de ranked.`);
        message.channel.send({ embeds: [errorEmbed] });
        return;
    }

    let confEmbed = crearEmbed(
        "**Reporte de partidas**",
        `**Ranked**
        El usuario ${AUTOR} le ha ganado a ${MENCIONADO}.\n
        **Esperando confirmacion.**
        ${MENCIONADO.username} debera reaccionar con ✅ para confirmar la partida, o utilizar ❌ para rechazarla.`,
        "#ffdf00",
        message.author.displayAvatarURL()
    );
    confEmbed.setFooter({ text: "Tiempo para confirmar: 30 segundos. 🕒" });

    message.channel.send({ embeds: [confEmbed] }).then(confirmacion => {
        confirmacion.react('✅').then(() => confirmacion.react('❌'));

        // Creo un filtro y espero la reaccion del otro usuario
        const filtro = (reaction, user) => {
            return ["✅", "❌"].includes(reaction.emoji.name) && user.id === MENCIONADO.id;
        };
        const collector = confirmacion.createReactionCollector({ filter: filtro, max: 1, time: 30000 });
        collector.on('collect', (reaccion) => {
            switch (reaccion.emoji.name) {
                case '✅':
                    const resultadosPartida = calcularEloPartida(DATOS[AUTOR.id].elo, DATOS[MENCIONADO.id].elo);

                    DATOS[AUTOR.id].elo = resultadosPartida.nuevoEloGanador;
                    DATOS[MENCIONADO.id].elo = resultadosPartida.nuevoEloPerdedor;

                    DATOS[AUTOR.id].totalPartidas += 1;
                    DATOS[MENCIONADO.id].totalPartidas += 1;

                    DATOS[AUTOR.id].totalGanadas += 1;

                    fs.writeFile(path.join(__dirname, "../datos.json"), JSON.stringify(DATOS, null, 4), (err) => {
                        if (err) console.error("Error guardando datos:", err);
                    });

                    let confirmada = crearEmbed(
                        "**Reporte.**",
                        `**Ranked.**
                        El usuario ${AUTOR} le ha ganado a ${MENCIONADO}.\n
                        **Estado:** Confirmado. ✅\n
                        El nuevo elo de ${AUTOR} es de ${resultadosPartida.nuevoEloGanador}, mientras el elo de ${MENCIONADO} bajo ${resultadosPartida.nuevoEloPerdedor}.`,
                        "ffdf00",
                        AUTOR.displayAvatarURL()
                    );

                    client.channels.cache.get(CONFIG.canales.reportes).send({ embeds: [confirmada] });
                    break;
                case '❌':
                    let rechazada = crearEmbed("**Partida rechazada**", `${AUTOR} tu partida fue rechazada. ❌`, "#ff0000")
                        .setFooter({ text: "Si crees que es un error, habla con el usuario mencionado o un administrador." });
                    message.channel.send({ embeds: [rechazada] });
                    break;
            }
        });
        collector.on('end', (reacciones, motivo) => {
            if (motivo === "time") {
                confirmacion.delete();
                let noRespondido = crearEmbed(
                    "**Sin confirmar**",
                    `${AUTOR} tu partida no fue respondida a tiempo. 🕓`,
                    "#ff8000"
                ).setFooter({ text: "Han pasado los 30 segundos de confirmacion." });
                message.channel.send({ embeds: [noRespondido] });
            }
        });

    }).catch(err => {
        console.error("Error al confirmar:", err);
    });
}

module.exports = { ejecutarWin };