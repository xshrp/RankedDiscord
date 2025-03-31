const { crearEmbed } = require("../utiles/embeds");
const rIdRanked = "1356312423291814219";

function ejecutarAbandonar(message) {

    if (message.member.roles.cache.has(rIdRanked)) {
        let embed = crearEmbed(
            "**RageDuckZ - Ranked**",
            "**Acabas de salirte de la temporada de ranked.**\nRecuerda que tus puntos se mantendran.",
            "#ffdf00"
        );

        let rolesEliminar = message.member.roles.cache.filter(rol => [...rolesIdPodio, rIdRanked].includes(rol.id)).map(rol => rol.id);
        if (rolesEliminar.length > 0) message.member.roles.remove(rolesEliminar)

        message.channel.send({ embeds: [embed] });
    }

}

module.exports = { ejecutarAbandonar };