const { crearEmbed } = require("../utiles/embeds");
const ROLES = require("../config.json").roles;
const rolesIdPodio = [ROLES.bronce, ROLES.plata, ROLES.oro, ROLES.platino]
const rIdRanked = ROLES.ranked;

function ejecutarAbandonar(message) {

    if (message.member.roles.cache.has(rIdRanked)) {
        let embed = crearEmbed(
            "**Duck Game - Ranked**",
            "**Acabas de abandonar de la temporada de ranked.**\nRecuerda que tus puntos se mantendran.",
            "#ffdf00"
        );

        let rolesEliminar = message.member.roles.cache.filter(rol => [...rolesIdPodio, rIdRanked]
            .includes(rol.id))
            .map(rol => rol.id);
            
        if (rolesEliminar.length > 0) 
            message.member.roles.remove(rolesEliminar)

        message.channel.send({ embeds: [embed] });
    }

}

module.exports = { ejecutarAbandonar };