const { crearEmbed } = require("../utiles/embeds");
const { usuarioYaRegistrado, obtenerUsuario } = require("../utiles/funciones");

function ejecutarPerfil(message) {
    const args = message.content.split(/ +/g).slice(1);
    let perfilAMostrar =
        message.mentions.users.first() || // Por mencion
        message.guild.members.cache.find(u => u.user.username.toLowerCase() === args.join(" ").toLowerCase())?.user || // Por nombre de usuario
        message.author; // Por defecto

    if (!usuarioYaRegistrado(perfilAMostrar.id)) {
        message.channel.send({ embeds: [crearEmbed("Error", "El usuario no esta registrado en la temporada.", "#ff0000")] })
        return;
    }
    // Obtengo los datos del usuario JSON
    const usuario = obtenerUsuario(perfilAMostrar)

    let ratio = usuario.totalPartidas > 0 ? (usuario.totalGanadas / usuario.totalPartidas).toFixed(2) + " ratio" : "N/A";
    let participa = usuario.estaActivo ? "Si" : "No";

    let embed = crearEmbed(
        "**Perfil**",
        `Usuario \`${usuario.nick}\`\n      
         Elo: \`${usuario.elo}\`
         Rango: \`${usuario.rango}\`\n 
         Partidas: \`${usuario.totalPartidas}\`
         Ganadas: \`${usuario.totalGanadas}\` \`(${ratio})\` 
         Perdidas: \`${usuario.totalGanadas - usuario.totalGanadas}\` 
        `,
        "#ffdf00",
        perfilAMostrar.displayAvatarURL()
    );

    message.channel.send({ embeds: [embed] });
}

module.exports = { ejecutarPerfil };