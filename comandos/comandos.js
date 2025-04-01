const { crearEmbed } = require("../utiles/embeds");
const CONFIG = require("../config.json")
const rankedIdRol = CONFIG.roles.ranked;

function ejecutarComandos(message) {

    let embed = crearEmbed("**Comandos**", null, "ffdf00");
    if (message.member.roles.cache.has(rankedIdRol)) {
        embed.setDescription(`
            **Top**
            **•** \`r/top\` Utiliza este comando para obtener el top 10 de usuarios rankeados en relacion a su elo.\n
            **Win**
            **•** \`r/win [@Usuario]\` Se utiliza para reportar una partida de ranked ganada contra un usuario, al ejecutarse necesitara confirmacion del usuario mencionado.\n
            **Perfil**
            **•** \`r/perfil [@Usuario]\` Muestra el perfil con estadisticas de un usuario.\n
            **Abandonar**
            **•** \`r/abandonar\` Se utiliza para abandonar de la temporada de ranked (En caso de volver a unirse, tus estadisticas seguiran siendo las mismas).
        `);
    }
    else {
        embed.setDescription(`
            **Unirse**
            **•** \`r/unirse\` Acceso para participar en la temporada actual (Añade el rol Ranked).\n
            **Perfil**
            **•** \`r/perfil [@Usuario]\` Muestra el perfil con estadisticas de un usuario.\n
            **Top**
            **•** \`r/top\` Utiliza este comando para obtener el top 10 de usuarios rankeados en relacion a su elo.
        `);
        embed.setFooter({ text: "Estos son los unicos comandos que puedes utilizar si no estas en la temporada. ¡Unete y participa!."});
    }
    message.channel.send({ embeds: [embed] });
}

module.exports = { ejecutarComandos };